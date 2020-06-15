import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import Popover, { PopoverProps } from '..';

const renderPopover = (props?: any | Partial<PopoverProps>) => {
  return render(
    <Popover onRequestClose={() => {}} {...props}>
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
    renderPopover();

    expect(popoverIsRendered()).toBeFalsy();
  });

  it('renders children when isOpen is true', () => {
    renderPopover({ isOpen: true });
    expect(popoverIsRendered()).toBeTruthy();
  });

  it('triggers onRequestClose callback when escape key is triggered and escapeCloses is true', () => {
    const onRequestClose = jest.fn();
    const { baseElement } = renderPopover({
      isOpen: true,
      onRequestClose,
    });
    fireEvent.keyDown(baseElement, { key: 'Escape', code: 'Escape' });
    expect(onRequestClose.mock.calls.length).toBe(1);
  });

  it('does not trigger onRequestClose callback when escape key is triggered and escapeCloses is false', () => {
    const onRequestClose = jest.fn();
    const { baseElement } = renderPopover({
      isOpen: true,
      escapeCloses: false,
      onRequestClose,
    });
    fireEvent.keyDown(baseElement, { key: 'Escape', code: 'Escape' });
    expect(onRequestClose.mock.calls.length).toBe(0);
  });

  it('triggers onRequestClose callback when clicking the container', () => {
    const onRequestClose = jest.fn();
    renderPopover({
      isOpen: true,
      clickOutsideCloses: true,
      onRequestClose,
    });

    // focus-trap listens to mouseDown, not click
    fireEvent.mouseDown(screen.queryByTestId('popover-content').parentElement);
    expect(onRequestClose.mock.calls.length).toBe(1);
  });

  it('does not trigger onRequestClose callback when clicking inside', () => {
    const onRequestClose = jest.fn();
    renderPopover({
      isOpen: true,
      clickOutsideCloses: true,
      onRequestClose,
    });
    fireEvent.mouseDown(screen.queryByTestId('popover-content'));
    expect(onRequestClose.mock.calls.length).toBe(0);
  });
});
