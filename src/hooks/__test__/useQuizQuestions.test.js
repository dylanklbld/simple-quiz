import { Provider } from "react-redux";
import React from "react";
import { cleanup } from "@testing-library/react";
import configureMockStore from "redux-mock-store";
import nock from "nock";
import { renderHook } from "@testing-library/react-hooks";
import { useQuizQuestions } from "../useQuizQuestions";

const initialState = {
  questions: { questionIdList: [] },
};
const mockStore = configureMockStore();

const getWrapper = (mockedStoreState = initialState) => ({ children }) => (
  <Provider store={mockStore(mockedStoreState)}>{children}</Provider>
);

afterAll(() => {
  cleanup();
  nock.restore();
});

afterEach(nock.cleanAll);

it("should call the promise and return the result", async function () {
  nock("http://jservice.io")
    .defaultReplyHeaders({
      "access-control-allow-origin": "*",
      "access-control-allow-credentials": "true",
    })
    .get("/api/random")
    .reply(
      200,
      JSON.stringify([
        {
          id: 1,
          question: "Huh?",
          answer: "Yeah",
        },
      ])
    );

  const wrapper = getWrapper();

  const { result, waitForNextUpdate, waitFor } = renderHook(
    () => useQuizQuestions(),
    { wrapper }
  );

  await waitForNextUpdate();

  expect(result.current[0]).toStrictEqual({
    id: 1,
    question: "Huh?",
    answer: "Yeah",
  });
});

it("should refetch question when it was shown before", async function () {
  nock("http://jservice.io")
    .defaultReplyHeaders({
      "access-control-allow-origin": "*",
      "access-control-allow-credentials": "true",
    })
    .get("/api/random")
    .reply(
      200,
      JSON.stringify([
        {
          id: 1,
          question: "Huh?",
          answer: "Yeah",
        },
      ])
    )
    .get("/api/random")
    .reply(
      200,
      JSON.stringify([
        {
          id: 2,
          question: "Echt?",
          answer: "Ja",
        },
      ])
    );

  const wrapper = getWrapper({
    questions: { questionIdList: [1] },
  });

  const { result, waitForNextUpdate, waitFor } = renderHook(
    () => useQuizQuestions(),
    { wrapper }
  );

  await waitForNextUpdate();

  expect(result.current[0]).toBe(null);
  // isWaiting
  expect(result.current[2]).toBe(true);

  await waitForNextUpdate();

  // isWaiting
  expect(result.current[2]).toBe(false);
  // shownQuestion
  expect(result.current[0]).toStrictEqual({
    id: 2,
    question: "Echt?",
    answer: "Ja",
  });
});
