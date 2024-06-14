import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent, screen } from '@testing-library/react';
import * as React from 'react';

import { FocusTrap, FocusTrapProps } from '..';

const FocusTrapContainer: React.FC<Partial<FocusTrapProps>> = ({
  onClickOutside,
  ...props
}) => {
  const [open, setIsOpen] = React.useState(true);

  const handleOutsideClick = (e: MouseEvent) => {
    if (onClickOutside) {
      onClickOutside?.(e);
    }
    setIsOpen(false);
  };

  return (
    <div data-testid="focus-trap-outside">
      <button aria-label="Button" type="button" data-testid="button-outside" />
      <FocusTrap active={open} onClickOutside={handleOutsideClick} {...props}>
        <div data-testid="focus-trap-content">
          Howdy!
          <button
            aria-label="Button"
            type="button"
            data-testid="button-inside"
          />
        </div>
      </FocusTrap>
    </div>
  );
};

const renderFocusTrap = setupRtl(FocusTrapContainer);

const focusTrapIsRendered = () => {
  return Boolean(screen.queryByTestId('focus-trap-content'));
};

describe('FocusTrap', () => {
  it('renders children', () => {
    renderFocusTrap();
    expect(focusTrapIsRendered()).toBeTruthy();
  });

  it('auto focuses on children', () => {
    renderFocusTrap();
    const expectedFocusedButton = screen.queryByTestId('button-inside');
    expect(document.activeElement).toEqual(expectedFocusedButton);
  });

  it('triggers onEscapeKey callback when escape key is triggered', () => {
    const onEscapeKey = jest.fn();
    const { view } = renderFocusTrap({
      onEscapeKey,
    });
    fireEvent.keyDown(view.baseElement, { key: 'Escape', code: 'Escape' });
    expect(onEscapeKey.mock.calls.length).toBe(1);
  });

  it('triggers onRequestClose callback when clicking outside the container', () => {
    const onClickOutside = jest.fn();
    renderFocusTrap({
      onClickOutside,
    });

    // focus-on listens to mouseDown, not click
    fireEvent.mouseDown(screen.getByTestId('focus-trap-outside'));
    expect(onClickOutside.mock.calls.length).toBe(1);
  });

  it('does not trigger onClickOutside callback when clicking inside', () => {
    const onClickOutside = jest.fn();
    renderFocusTrap({
      onClickOutside,
    });
    fireEvent.mouseDown(screen.getByTestId('focus-trap-content'));
    expect(onClickOutside.mock.calls.length).toBe(0);
  });

  it('calls onDeactivation when FocusTrap is closed', () => {
    const onDeactivation = jest.fn();

    renderFocusTrap({
      onDeactivation,
    });

    fireEvent.mouseDown(screen.getByTestId('focus-trap-outside'));

    expect(onDeactivation).toBeCalledTimes(1);
  });
});
