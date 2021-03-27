import { setupRtl } from '@codecademy/gamut-tests';
import { screen } from '@testing-library/react';
import React from 'react';

import { Coachmark } from '..';

const renderView = setupRtl(Coachmark, {
  shouldShow: true,
  delay: 0,
  children: <div data-testid="coachmark-ref">hello</div>,
  renderPopover: () => (
    <div data-testid="coachmark-popover-content">
      hello again
      <button type="button" onClick={() => {}}>
        click me
      </button>
    </div>
  ),
});

describe('Coachmark', () => {
  it('renders children', () => {
    renderView();
    expect(screen.queryByTestId('coachmark-ref')).toBeInTheDocument();
  });

  it('does not render Popover when shouldShow is false', () => {
    renderView({ shouldShow: false });
    expect(screen.queryByTestId('popover-content-container')).toBeFalsy;
  });

  it('renders Popover when shouldShow is true', () => {
    renderView();
    expect(screen.queryByTestId('popover-content-container')).toBeTruthy;
  });

  it('renders content provided by renderPopover', () => {
    renderView();
    expect(screen.queryByTestId('coachmark-popover-content')).toBeTruthy;
  });

  it('renders Popover after the delay', () => {
    jest.useFakeTimers();
    renderView({ shouldShow: false, delay: 5000 });

    expect(screen.queryByTestId('popover-content-container')).toBeFalsy;
    jest.runAllTimers();
    expect(screen.queryByTestId('popover-content-container')).toBeTruthy;
  });
});
