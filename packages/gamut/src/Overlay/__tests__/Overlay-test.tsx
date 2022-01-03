import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent, screen } from '@testing-library/react';
import React from 'react';

import { Overlay } from '..';

const renderView = setupRtl(Overlay, {
  children: (
    <div data-testid="overlay-content">
      Howdy!
      <button aria-label="Button" type="button" />
    </div>
  ),
  onRequestClose: jest.fn(),
}).options({
  wrapper: ({ children }) => <main>{children}</main>,
});

const overlayIsRendered = () => {
  return Boolean(screen.queryByTestId('overlay-content'));
};

describe('Overlay', () => {
  it('renders null when isOpen is not true', () => {
    renderView();

    expect(overlayIsRendered()).toBeFalsy();
  });

  it('renders children when isOpen is true', () => {
    renderView({ isOpen: true });
    expect(overlayIsRendered()).toBeTruthy();
  });

  it('triggers onRequestClose callback when escape key is triggered and escapeCloses is true', () => {
    const onRequestClose = jest.fn();
    const { view } = renderView({
      isOpen: true,
      onRequestClose,
    });
    fireEvent.keyDown(view.baseElement, { key: 'Escape', code: 'Escape' });
    expect(onRequestClose.mock.calls.length).toBe(1);
  });

  it('does not trigger onRequestClose callback when escape key is triggered and escapeCloses is false', () => {
    const onRequestClose = jest.fn();
    const { view } = renderView({
      isOpen: true,
      escapeCloses: false,
      onRequestClose,
    });
    fireEvent.keyDown(view.baseElement, { key: 'Escape', code: 'Escape' });
    expect(onRequestClose.mock.calls.length).toBe(0);
  });

  it('triggers onRequestClose callback when clicking the container', () => {
    const onRequestClose = jest.fn();
    renderView({
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
    renderView({
      isOpen: true,
      clickOutsideCloses: true,
      onRequestClose,
    });
    fireEvent.mouseDown(screen.getByTestId('overlay-content'));
    expect(onRequestClose.mock.calls.length).toBe(0);
  });

  it('renders outside its mounting container when inline is false', () => {
    renderView({ isOpen: true });

    /** Overlay prevents main from being accessible  */
    expect(screen.queryByRole('main')).toBe(null);
  });

  it('renders inside its mounting container when inline is true', () => {
    renderView({ inline: true, isOpen: true });

    /** main is accessible as overlay is rendering within its bounds */
    screen.getByRole('main');
  });

  it('it disables focus trap when rendered inline', () => {
    const onRequestClose = jest.fn();
    const { view } = renderView({
      inline: true,
      isOpen: true,
      clickOutsideCloses: true,
      onRequestClose,
    });

    // focus-trap listens to mouseDown, not click
    fireEvent.mouseDown(screen.getByTestId('overlay-content-container'));
    expect(onRequestClose.mock.calls.length).toBe(0);
    fireEvent.keyDown(view.baseElement, { key: 'Escape', code: 'Escape' });
    expect(onRequestClose.mock.calls.length).toBe(0);
  });

  it('allows additional styles when using the className prop', () => {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = '.fakeClassName { text-align: center; }';
    document.body.appendChild(styleTag);

    const { view } = renderView({ isOpen: true, className: 'fakeClassName' });

    const containerStyles = getComputedStyle(
      view.getByTestId('overlay-content-container')
    );

    expect(containerStyles.getPropertyValue('position')).toBe('fixed');
    expect(containerStyles.getPropertyValue('text-align')).toBe('center');
  });

  it('overloads default styling when using the className prop', async () => {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = '.fakeClassName { position: sticky; }';
    document.body.appendChild(styleTag);

    const { view } = renderView({ isOpen: true, className: 'fakeClassName' });

    const containerStyles = getComputedStyle(
      view.getByTestId('overlay-content-container')
    );

    expect(containerStyles.getPropertyValue('position')).toBe('sticky');
  });
});
