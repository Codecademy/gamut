import React, { useState, useCallback } from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import { Overlay, OverlayProps } from '..';

const renderOverlay = (props?: Partial<OverlayProps>) => {
  return render(
    <Overlay onRequestClose={() => {}} {...props}>
      <div data-testid="overlay-content">
        Howdy!
        <button type="button" onClick={props?.onRequestClose} />
      </div>
    </Overlay>
  );
};

const ToggleableOverlay = ({
  closeCallback,
}: {
  closeCallback: () => void;
}) => {
  const [isOpen, setOpen] = useState(true);
  const onRequestClose = useCallback(() => {
    closeCallback();
    setOpen(false);
  }, [closeCallback]);

  return (
    <Overlay
      isOpen={isOpen}
      clickOutsideCloses
      escapeCloses
      onRequestClose={onRequestClose}
    >
      <div data-testid="overlay-content">
        Howdy!
        <button type="button" onClick={onRequestClose} />
      </div>
    </Overlay>
  );
};

const overlayIsRendered = () => {
  return Boolean(screen.queryByTestId('overlay-content'));
};

describe('Overlay', () => {
  it('renders null when isOpen is not true', () => {
    renderOverlay();

    expect(overlayIsRendered()).toBeFalsy();
  });

  it('renders children when isOpen is true', () => {
    renderOverlay({ isOpen: true });
    expect(overlayIsRendered()).toBeTruthy();
  });

  it('triggers onRequestClose callback when escape key is triggered and escapeCloses is true', () => {
    const onRequestClose = jest.fn();
    const { baseElement } = renderOverlay({
      isOpen: true,
      onRequestClose,
    });
    fireEvent.keyDown(baseElement, { key: 'Escape', code: 'Escape' });
    expect(onRequestClose.mock.calls.length).toBe(1);
  });

  it('does not trigger onRequestClose callback when escape key is triggered and escapeCloses is false', () => {
    const onRequestClose = jest.fn();
    const { baseElement } = renderOverlay({
      isOpen: true,
      escapeCloses: false,
      onRequestClose,
    });
    fireEvent.keyDown(baseElement, { key: 'Escape', code: 'Escape' });
    expect(onRequestClose.mock.calls.length).toBe(0);
  });

  it('triggers onRequestClose callback when clicking the container', () => {
    const onRequestClose = jest.fn();
    renderOverlay({
      isOpen: true,
      clickOutsideCloses: true,
      onRequestClose,
    });

    // focus-trap listens to mouseDown, not click
    fireEvent.mouseDown(screen.getByTestId('overlay-content').parentElement!);
    expect(onRequestClose.mock.calls.length).toBe(1);
  });

  it('does not trigger onRequestClose callback when clicking inside', () => {
    const onRequestClose = jest.fn();
    renderOverlay({
      isOpen: true,
      clickOutsideCloses: true,
      onRequestClose,
    });
    fireEvent.mouseDown(screen.getByTestId('overlay-content'));
    expect(onRequestClose.mock.calls.length).toBe(0);
  });

  it('triggers onRequestClose callback once when triggered manually', () => {
    const closeCallback = jest.fn();
    render(<ToggleableOverlay closeCallback={closeCallback} />);
    fireEvent.click(screen.getByRole('button'));
    expect(closeCallback.mock.calls.length).toBe(1);
  });
});
