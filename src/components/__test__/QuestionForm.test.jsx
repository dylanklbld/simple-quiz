import QuestionForm, { placeholderText } from "../QuestionForm";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";

import React from "react";
import { act } from "react-dom/test-utils";

const onCorrectAnswer = jest.fn();
const onWrongAnswer = jest.fn();

const mockedQuestion = {
  question: "A",
  answer: "b",
};

afterEach(cleanup);

test("calls on correct answer", async () => {
  render(
    <QuestionForm
      question={mockedQuestion}
      onCorrectAnswer={onCorrectAnswer}
      onWrongAnswer={onWrongAnswer}
    />
  );

  const inputElement = screen.getByPlaceholderText(placeholderText);

  act(() => {
    fireEvent.change(inputElement, { target: { value: "B" } });
  });

  fireEvent.submit(screen.getByText("Submit"));

  expect(onCorrectAnswer).toBeCalled();
  expect(onWrongAnswer).not.toBeCalled();
});

test("ignores quotes or <i> tag", async () => {
  render(
    <QuestionForm
      question={mockedQuestion}
      onCorrectAnswer={onCorrectAnswer}
      onWrongAnswer={onWrongAnswer}
    />
  );

  const inputElement = screen.getByPlaceholderText(placeholderText);

  act(() => {
    fireEvent.change(inputElement, { target: { value: '<i>"B"</i>' } });
  });

  fireEvent.submit(screen.getByText("Submit"));

  expect(onCorrectAnswer).toBeCalled();
  expect(onWrongAnswer).not.toBeCalled();
});

test("calls on wrong answer", async () => {
  render(
    <QuestionForm
      question={mockedQuestion}
      onCorrectAnswer={onCorrectAnswer}
      onWrongAnswer={onWrongAnswer}
    />
  );
  const inputElement = screen.getByPlaceholderText(placeholderText);

  act(() => {
    fireEvent.change(inputElement, { target: { value: "ABC" } });
  });
  fireEvent.submit(screen.getByText("Submit"));

  expect(onCorrectAnswer).not.toBeCalled();
  expect(onWrongAnswer).toBeCalled();
});
