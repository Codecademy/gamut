import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent } from '@testing-library/react';

import { Overlay, OverlayProps } from '..';

const OverlayTest = (props?: Partial<OverlayProps>) => {
  return (
    <main>
      <Overlay onRequestClose={jest.fn()} {...props}>
        <div data-testid="overlay-content">
          Howdy!
          <button aria-label="Button" type="button" />
        </div>
      </Overlay>
    </main>
  );
};
const overlayIsRendered = (view: ReturnType<typeof renderView>['view']) => {
  return Boolean(view.queryByTestId('overlay-content'));
};
const renderView = setupRtl(OverlayTest, {});

describe('Overlay', () => {
  it('renders null when isOpen is not true', () => {
    const { view } = renderView();

    expect(overlayIsRendered(view)).toBeFalsy();
  });

  it('renders children when isOpen is true', () => {
    const { view } = renderView({ isOpen: true });

    expect(overlayIsRendered(view)).toBeTruthy();
  });

  it('triggers onRequestClose callback when escape key is triggered and escapeCloses is true', () => {
    const onRequestClose = jest.fn();
    const { view } = renderView({
      isOpen: true,
      onRequestClose,
    });
    const baseElement = view.getByTestId('overlay-content');
    fireEvent.keyDown(baseElement, { key: 'Escape', code: 'Escape' });

    expect(onRequestClose).toHaveBeenCalled();
  });

  it('does not trigger onRequestClose callback when escape key is triggered and escapeCloses is false', () => {
    const onRequestClose = jest.fn();
    const { view } = renderView({
      isOpen: true,
      escapeCloses: false,
      onRequestClose,
    });
    const baseElement = view.getByTestId('overlay-content');
    fireEvent.keyDown(baseElement, { key: 'Escape', code: 'Escape' });

    expect(onRequestClose).not.toHaveBeenCalled();
  });

  it('triggers onRequestClose callback when clicking the container', () => {
    const onRequestClose = jest.fn();
    const { view } = renderView({
      isOpen: true,
      clickOutsideCloses: true,
      onRequestClose,
    });
    // focus-trap listens to mouseDown, not click
    fireEvent.mouseDown(view.getByTestId('overlay-content-container'));

    expect(onRequestClose).toHaveBeenCalled();
  });

  it('does not trigger onRequestClose callback when clicking inside', () => {
    const onRequestClose = jest.fn();
    const { view } = renderView({
      isOpen: true,
      clickOutsideCloses: true,
      onRequestClose,
    });
    fireEvent.mouseDown(view.getByTestId('overlay-content'));

    expect(onRequestClose).not.toHaveBeenCalled();
  });

  it('renders outside its mounting container when inline is false', () => {
    const { view } = renderView({ isOpen: true });

    /** Overlay prevents main from being accessible  */
    expect(view.queryByRole('main')).toBe(null);
  });

  it('renders inside its mounting container when inline is true', () => {
    const { view } = renderView({ inline: true, isOpen: true });
    /** main is accessible as overlay is rendering within its bounds */
    view.getByRole('main');
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
    fireEvent.mouseDown(view.getByTestId('overlay-content-container'));

    expect(onRequestClose).not.toHaveBeenCalled();

    fireEvent.keyDown(view.getByTestId('overlay-content'), {
      key: 'Escape',
      code: 'Escape',
    });

    expect(onRequestClose).not.toHaveBeenCalled();
  });

  it('allows additional styles when using the className prop', () => {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = '.fakeClassName { text-align: center; }';
    document.body.appendChild(styleTag);
    const { view } = renderView({ isOpen: true, className: 'fakeClassName' });
    const container = view.getByTestId('overlay-content-container');

    expect(container).toHaveStyle({ position: 'fixed' });
    expect(container).toHaveStyle({ textAlign: 'center' });
  });
});
