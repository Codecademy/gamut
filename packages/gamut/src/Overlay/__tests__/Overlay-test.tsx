import { fireEvent, render, screen } from '@testing-library/react';
import { mount } from 'enzyme';
import React from 'react';

import { Overlay, OverlayProps } from '..';

const renderOverlay = (props?: Partial<OverlayProps>) => {
  return render(
    <Overlay onRequestClose={() => {}} {...props}>
      <div data-testid="overlay-content">
        Howdy!
        <button aria-label="Button" type="button" />
      </div>
    </Overlay>
  );
};

const mountOverlay = (props?: Partial<OverlayProps>) => {
  return mount(
    <Overlay onRequestClose={() => {}} {...props}>
      <div data-testid="overlay-content">
        Howdy!
        <button aria-label="Button" type="button" />
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
    fireEvent.mouseDown(screen.getByTestId('overlay-content-container'));
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

  it('allows additional styles when using the className prop', () => {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = '.fakeClassName { text-align: center; }';
    document.body.appendChild(styleTag);

    const wrapped = mountOverlay({ isOpen: true, className: 'fakeClassName' });

    const containerStyles = getComputedStyle(
      wrapped.find('div[data-testid="overlay-content-container"]').getDOMNode()
    );

    expect(containerStyles.getPropertyValue('position')).toBe('fixed');
    expect(containerStyles.getPropertyValue('text-align')).toBe('center');
  });

  it('overloads default styling when using the className prop', async () => {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = '.fakeClassName { position: sticky; }';
    document.body.appendChild(styleTag);

    const wrapped = mountOverlay({ isOpen: true, className: 'fakeClassName' });

    const containerStyles = getComputedStyle(
      wrapped.find('div[data-testid="overlay-content-container"]').getDOMNode()
    );

    expect(containerStyles.getPropertyValue('position')).toBe('sticky');
  });
});
