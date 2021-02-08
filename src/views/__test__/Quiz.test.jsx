import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";

import { GameStatus } from "../../types";
import { Provider } from "react-redux";
import Quiz from "../Quiz";
import React from "react";
import configureMockStore from "redux-mock-store";

const initialState = {
  questions: { questionIdList: [] },
  quizInfo: {
    roundsAmount: 2,
    timePeriodInSeconds: 10,
    round: 1,
    score: 0,
    gameStatus: GameStatus.NotStarted,
  },
};

jest.mock("../../components/OutcomePopup", () => ({ answer, gameStatus }) => {
  const GameStatus = require("../../types").GameStatus;
  return (
    <div name="popup">
      <div>
        {gameStatus === GameStatus.Won
          ? "You won!"
          : gameStatus === GameStatus.Lost
          ? "You've lost"
          : "Not showing"}
      </div>
      <div>{answer}</div>
    </div>
  );
});

jest.mock(
  "../../components/CountdownTimer",
  () => ({ timeInSeconds, timePeriodInSeconds }) => (
    <div name="timer">
      <div>left: {timeInSeconds}</div>
      <div>Full: {timePeriodInSeconds}</div>
    </div>
  )
);

const mockDispatch = jest.fn();

const mockStore = configureMockStore();

const renderWithProviders = (mockedStoreState = initialState) => {
  const store = mockStore(mockedStoreState);
  store.dispatch = mockDispatch;

  return render(
    <Provider store={store}>
      <Quiz />
    </Provider>
  );
};

afterAll(() => {
  cleanup();
});

afterEach(() => {
  jest.clearAllMocks();
});

test("on click start starts the game", async () => {
  const { getByText } = renderWithProviders();

  fireEvent.click(getByText("Start"));

  expect(mockDispatch).toBeCalledWith({
    payload: {
      hasWrongAnswer: false,
    },
    type: "UPDATE_GAME_STATUS",
  });
});

test("on click reset resets quiz", async () => {
  const { getByText } = renderWithProviders({
    ...initialState,
    quizInfo: { ...initialState.quizInfo, gameStatus: GameStatus.Playing },
  });

  getByText("Reset");
  fireEvent.click(getByText("Reset"));

  expect(mockDispatch).toBeCalledWith({
    type: "RESET_QUIZ",
  });
});

test("shows popup on win", async () => {
  const { getByText } = renderWithProviders({
    ...initialState,
    quizInfo: { ...initialState.quizInfo, gameStatus: GameStatus.Won },
  });

  getByText("You won!");
});

test("shows popup on lose", async () => {
  const { getByText } = renderWithProviders({
    ...initialState,
    quizInfo: { ...initialState.quizInfo, gameStatus: GameStatus.Lost },
  });

  getByText("You've lost");
});
