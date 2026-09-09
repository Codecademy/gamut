import { setupRtl } from '@codecademy/gamut-tests';
import { act } from '@testing-library/react';

import { Coachmark } from '..';

const renderPopover = () => (
  <div data-testid="coachmark-popover-content">
    hello again
    <button type="button" onClick={jest.fn}>
      click me
    </button>
  </div>
);

const renderView = setupRtl(Coachmark, {
  renderPopover,
  shouldShow: true,
  children: <div data-testid="coachmark-ref">hello</div>,
});

describe('Coachmark', () => {
  it('renders children', () => {
    const { view } = renderView();

    expect(view.queryByTestId('coachmark-ref')).toBeInTheDocument();
  });

  it('forwards data-* and aria-* attributes to the active element wrapper', () => {
    const { view } = renderView({
      'data-marker': 'probe',
      'aria-keyshortcuts': 'probeAria',
    } as any);

    const wrapper = view.getByTestId('coachmark-ref').parentElement;

    expect(wrapper).toHaveAttribute('data-marker', 'probe');
    expect(wrapper).toHaveAttribute('aria-keyshortcuts', 'probeAria');
  });

  it("renders children even when the coachmark's popover is not set to show", () => {
    const { view } = renderView({ shouldShow: false });

    expect(view.queryByTestId('coachmark-ref')).toBeInTheDocument();
  });

  it('does not render Popover when shouldShow is false', () => {
    const { view } = renderView({ shouldShow: false });
    expect(view.queryByTestId('coachmark-popover-content')).toBeFalsy();
  });

  it('renders the popover when shouldShow is true', () => {
    const { view } = renderView({ delay: 0 });
    expect(view.queryByTestId('coachmark-popover-content')).toBeTruthy();
  });

  it('renders the popover immediately if no delay and shouldShow is true', () => {
    const { view } = renderView({ delay: 0 });

    expect(view.queryByTestId('coachmark-popover-content')).toBeTruthy();
  });

  it('renders the popover after the delay', () => {
    jest.useFakeTimers();
    const delayTimer = 1000;
    const { view } = renderView({ shouldShow: true, delay: delayTimer });

    expect(view.queryByTestId('coachmark-popover-content')).toBeFalsy();

    act(() => {
      jest.advanceTimersByTime(delayTimer);
    });

    expect(view.queryByTestId('coachmark-popover-content')).toBeTruthy();
  });
});
