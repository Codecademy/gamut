import { setupRtl } from '@codecademy/gamut-tests';
import { act } from '@testing-library/react';

import { DelayedRenderWrapper } from '../DelayedRenderWrapper';

const renderView = setupRtl(DelayedRenderWrapper, {
  children: <div data-testid="wrapper-child">Child Content</div>,
});

describe('DelayedRenderWrapper', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('should not render children immediately', () => {
    const { view } = renderView({ delay: 1000 });

    expect(view.queryByTestId('wrapper-child')).toBeNull();
  });

  it('should render children immediately if delay is 0', () => {
    const { view } = renderView({ delay: 0 });

    expect(view.queryByTestId('wrapper-child')).toBeTruthy();
  });

  it('should render children after the delay', () => {
    const { view } = renderView({ delay: 1000 });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(view.queryByTestId('wrapper-child')).toBeTruthy();
  });
});
