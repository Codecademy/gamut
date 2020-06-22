import React from 'react';
import { render, screen } from '@testing-library/react';
import Popover, { PopoverProps } from '..';

const renderPopover = (props?: Partial<PopoverProps>) => {
  return render(
    <Popover isOpen={true} offset={20} position="below" {...props}>
      <div data-testid="popover-content">
        Howdy!
        <button type="button" />
      </div>
    </Popover>
  );
};

const popoverIsRendered = () => {
  return Boolean(screen.queryByTestId('popover-content'));
};

describe('Popover', () => {
  it('renders null when isOpen is not true', () => {
    renderPopover({ isOpen: false });

    expect(popoverIsRendered()).toBeFalsy();
  });

  it('renders children when isOpen is true', () => {
    renderPopover({ isOpen: true });
    expect(popoverIsRendered()).toBeTruthy();
  });

  it('does not show a screen overlay if the prop is false', () => {
    renderPopover({
      isOpen: true,
      showScreen: false,
    });

    expect(screen.queryByTestId('popover-screen')).toBeInTheDocument();
  });

  it('shows a screen overlay if the prop is true', () => {
    renderPopover({
      isOpen: true,
      showScreen: true,
    });

    expect(screen.queryByTestId('popover-screen')).toBeInTheDocument();
  });

  it('does not show a beak if the prop is false', () => {
    renderPopover({
      isOpen: true,
      showBeak: false,
    });

    expect(screen.queryByTestId('popover-beak')).toBeInTheDocument();
  });

  it('shows a beak if the prop is true', () => {
    renderPopover({
      isOpen: true,
      showBeak: true,
    });

    expect(screen.queryByTestId('popover-beak')).toBeInTheDocument();
  });

  it('shows a beak if the prop is true', () => {
    renderPopover({
      isOpen: true,
      showBeak: true,
    });

    expect(screen.queryByTestId('popover-beak')).toBeInTheDocument();
  });
});
