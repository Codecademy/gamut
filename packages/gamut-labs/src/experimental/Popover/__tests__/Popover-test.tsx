import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Popover, PopoverProps } from '..';

const targetRefObj = ({
  current: {
    contains: () => false,
    getBoundingClientRect: () => {
      return {
        bottom: 298,
        height: 38,
        left: 57,
        right: 840,
        top: 260,
        width: 783,
        x: 57,
        y: 260,
        toJSON: () => {},
      };
    },
  },
} as unknown) as React.RefObject<HTMLElement>;

const renderPopover = (props?: Partial<PopoverProps>) => {
  return render(
    <>
      <Popover isOpen={true} targetRef={targetRefObj} {...props}>
        <div data-testid="popover-content">
          Howdy!
          <button type="button" />
        </div>
      </Popover>
      <div>
        <h1 data-testid="outside-popover">hi</h1>
      </div>
    </>
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

  it('triggers onRequestClose callback when clicking outside', () => {
    const onRequestClose = jest.fn();
    renderPopover({
      isOpen: true,
      onRequestClose,
    });
    fireEvent.mouseDown(screen.getByTestId('outside-popover'));
    expect(onRequestClose).toBeCalledTimes(1);
  });

  it('does not trigger onRequestClose callback when clicking inside', () => {
    const onRequestClose = jest.fn();
    renderPopover({
      isOpen: true,
      onRequestClose,
    });
    fireEvent.mouseDown(screen.getByTestId('popover-content-container'));
    expect(onRequestClose).toBeCalledTimes(0);
  });

  it('triggers onRequestClose callback when escape key is triggered', () => {
    const onRequestClose = jest.fn();
    const { baseElement } = renderPopover({
      isOpen: true,
      onRequestClose,
    });
    fireEvent.keyDown(baseElement, { key: 'Escape', keyCode: 27 });
    expect(onRequestClose).toBeCalledTimes(1);
  });
});
