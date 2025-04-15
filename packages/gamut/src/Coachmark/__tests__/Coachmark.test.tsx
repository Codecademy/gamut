import { theme } from '@codecademy/gamut-styles';
import { ThemeProvider } from '@emotion/react';
import { act, render, screen } from '@testing-library/react';

import { Coachmark, CoachmarkProps } from '..';

jest.useFakeTimers();

const renderPopover = () => (
  <div data-testid="coachmark-popover-content">
    hello again
    <button type="button" onClick={jest.fn}>
      click me
    </button>
  </div>
);

const renderCoachmark = ({ delay, ...props }: Partial<CoachmarkProps>) => {
  return render(
    <div>
      <ThemeProvider theme={theme}>
        <Coachmark
          delay={delay}
          shouldShow
          renderPopover={renderPopover}
          {...props}
        >
          <div data-testid="coachmark-ref">hello</div>
        </Coachmark>
      </ThemeProvider>
    </div>
  );
};

describe('Coachmark', () => {
  it('renders children', () => {
    renderCoachmark({ delay: 0 });
    expect(screen.queryByTestId('coachmark-ref')).toBeInTheDocument();
  });

  it('does not render Popover when shouldShow is false', () => {
    renderCoachmark({ shouldShow: false, delay: 0 });
    expect(screen.queryByTestId('coachmark-popover-content')).toBeFalsy();
  });

  // TODO [EGG-1763]: Enable these again!
  it('renders Popover when shouldShow is true', () => {
    renderCoachmark({ delay: 0 });
    expect(screen.queryByTestId('coachmark-popover-content')).toBeTruthy();
  });

  it('renders content provided by renderPopover', () => {
    renderCoachmark({ delay: 0 });
    expect(screen.queryByTestId('coachmark-popover-content')).toBeTruthy();
  });

  it.skip('renders Popover after the delay', () => {
    const delayTimer = 1000;

    act(() => {
      renderCoachmark({ shouldShow: true, delay: delayTimer });
      expect(screen.queryByTestId('coachmark-popover-content')).toBeFalsy();

      jest.advanceTimersByTime(delayTimer);
      expect(screen.queryByTestId('coachmark-popover-content')).toBeTruthy();
    });
  });
});
