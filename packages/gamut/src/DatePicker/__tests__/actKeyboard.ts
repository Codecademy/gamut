import { act } from '@testing-library/react';

/**
 * Wraps `userEvent.keyboard` in `act` so key handlers that call `setState` in
 * DatePicker segments do not trigger "not wrapped in act(...)" in tests.
 * Flushes one microtask for Segment `queueMicrotask(applySegments)` work.
 */
export async function actKeyboard(
  user: { keyboard: (text: string) => Promise<void> },
  text: string
) {
  await act(async () => {
    await user.keyboard(text);
  });
  await act(async () => {
    await Promise.resolve();
  });
}
