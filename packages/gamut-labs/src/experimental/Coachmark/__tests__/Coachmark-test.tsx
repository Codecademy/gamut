import { theme } from '@codecademy/gamut-styles';
import { ThemeProvider } from '@emotion/react';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { Coachmark, CoachmarkProps } from '..';

const renderPopover = () => (
  <div data-testid="coachmark-popover-content">
    hello again
    <button type="button" onClick={() => {}}>
      click me
    </button>
  </div>
);

const renderCoachmark = (props?: Partial<CoachmarkProps>) => {
  return render(
    <ThemeProvider theme={theme}>
      <Coachmark delay={0} shouldShow renderPopover={renderPopover} {...props}>
        <div data-testid="coachmark-ref">hello</div>
      </Coachmark>
    </ThemeProvider>
  );
};

describe('Coachmark', () => {
  it('renders children', () => {
    renderCoachmark();
    expect(screen.queryByTestId('coachmark-ref')).toBeInTheDocument();
  });

  it('does not render Popover when shouldShow is false', () => {
    renderCoachmark({ shouldShow: false });
    expect(screen.queryByTestId('popover-content-container')).toBeFalsy;
  });

  it('renders Popover when shouldShow is true', () => {
    renderCoachmark();
    expect(screen.queryByTestId('popover-content-container')).toBeTruthy;
  });

  it('renders content provided by renderPopover', () => {
    renderCoachmark();
    expect(screen.queryByTestId('coachmark-popover-content')).toBeTruthy;
  });
});
