import { render, screen } from '@testing-library/react';

import { DelayedRenderWrapper } from '../DelayedRenderWrapper';

jest.useFakeTimers();

describe('DelayedRenderWrapper', () => {
  it('should not render children immediately', () => {
    render(
      <DelayedRenderWrapper delay={1000}>
        <div data-testid="child">Child Content</div>
      </DelayedRenderWrapper>
    );

    expect(screen.queryByTestId('child')).toBeNull();
  });

  it('should render children after the delay', () => {
    render(
      <DelayedRenderWrapper delay={1000}>
        <div data-testid="child">Child Content</div>
      </DelayedRenderWrapper>
    );

    jest.advanceTimersByTime(1000);

    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('should clean up the timer on unmount', () => {
    const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');
    const { unmount } = render(
      <DelayedRenderWrapper delay={1000}>
        <div data-testid="child">Child Content</div>
      </DelayedRenderWrapper>
    );

    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalled();
    clearTimeoutSpy.mockRestore();
  });

  it('should not render children if unmounted before delay', () => {
    const { unmount } = render(
      <DelayedRenderWrapper delay={1000}>
        <div data-testid="child">Child Content</div>
      </DelayedRenderWrapper>
    );

    unmount();
    jest.advanceTimersByTime(1000);

    expect(screen.queryByTestId('child')).toBeNull();
  });
});
