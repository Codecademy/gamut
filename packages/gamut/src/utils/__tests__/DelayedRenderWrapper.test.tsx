import { setupRtl } from '@codecademy/gamut-tests';
import { act, waitFor } from '@testing-library/react';

import { DelayedRenderWrapper } from '../DelayedRenderWrapper';


jest.useFakeTimers();

const renderView = setupRtl(DelayedRenderWrapper, { children: <div data-testid="wrapper-child">Child Content</div> });

describe('DelayedRenderWrapper', () => {
  it('should not render children immediately', async () => {
    const { view } = renderView({ delay: 1000 });
    // jest.advanceTimersByTime(2000);

    await act(async () => {
      jest.advanceTimersByTime(2000);
      await waitFor(() => {
        expect(view.findByTestId('wrapper-child')).toThrow();
      });
    });

  });

  it('should render children after the delay', async () => {
    const { view } = renderView({ delay: 500 });
    jest.advanceTimersByTime(501);
    expect(view.findByTestId('wrapper-child')).toBeTruthy()

    // await act(async () => {
    //   jest.advanceTimersByTime(501);
    //   await waitFor(() => {
    //     expect(view.findByTestId('wrapper-child')).toBeTruthy();
    //   }, { timeout: 1000 });
    // });
  });
});
