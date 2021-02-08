import { render, waitFor } from "@testing-library/react";

import CountdownTimer from "../CountdownTimer";
import React from "react";

const onTimeout = jest.fn();

test("calls on timeout function when its passed below 0 seconds", async () => {
  const { rerender } = render(
    <CountdownTimer
      onTimeout={onTimeout}
      timeInSeconds={1}
      timePeriodInSeconds={1}
    />
  );

  expect(onTimeout).not.toBeCalled();

  rerender(
    <CountdownTimer
      onTimeout={onTimeout}
      timeInSeconds={-1}
      timePeriodInSeconds={1}
    />
  );

  await waitFor(() => expect(onTimeout).toBeCalled());
});
