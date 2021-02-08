import { cleanup, fireEvent, render, screen } from "@testing-library/react";

import { GameStatus } from "../../types";
import OutcomePopup from "../OutcomePopup";
import React from "react";
import { act } from "react-dom/test-utils";

const onClose = jest.fn();
const onRestart = jest.fn();

afterEach(cleanup);

test("shows you won popup and calls on close", async () => {
  const { debug, getByText } = render(
    <OutcomePopup gameStatus={GameStatus.Won} {...{ onClose, onRestart }} />
  );

  const closeButton = screen.getByText("Close");

  getByText("Congratulations! You won!");

  act(() => {
    fireEvent.click(closeButton);
  });

  expect(onClose).toBeCalled();
});

test("shows you've lost popup with reason message and restarts", async () => {
  const { getByText } = render(
    <OutcomePopup
      answer="Correct answer"
      gameStatus={GameStatus.Lost}
      extraMessage="meh"
      {...{ onClose, onRestart }}
    />
  );

  getByText("You've lost! Sorry");
  getByText("Correct answer");

  const restartButton = screen.getByText("Restart");

  act(() => {
    fireEvent.click(restartButton);
  });

  expect(onRestart).toBeCalled();
});
