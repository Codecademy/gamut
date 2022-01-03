import { CheckerDense } from '@codecademy/gamut-patterns';
import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent, screen } from '@testing-library/react';
import { pick } from 'lodash';
import React from 'react';

import { Popover } from '..';

const targetRefObj = {
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
        toJSON: jest.fn(),
      };
    },
  },
};

const renderView = setupRtl(Popover, {
  children: (
    <div data-testid="popover-content">
      Howdy!
      <button aria-label="Click me!" type="button" />
    </div>
  ),
  isOpen: true,
  targetRef: targetRefObj,
}).options({
  wrapper: ({ children }) => (
    <>
      {children}
      <div>
        <h1 data-testid="outside-popover">hi</h1>
      </div>
    </>
  ),
});

const popoverIsRendered = () => {
  return Boolean(screen.queryByTestId('popover-content'));
};

describe('Popover', () => {
  it('renders null when isOpen is not true', () => {
    renderView({ isOpen: false });

    expect(popoverIsRendered()).toBeFalsy();
  });

  it('renders children when isOpen is true', () => {
    renderView({ isOpen: true });
    expect(popoverIsRendered()).toBeTruthy();
  });

  it('triggers onRequestClose callback when clicking outside', () => {
    const onRequestClose = jest.fn();
    renderView({
      isOpen: true,
      onRequestClose,
    });
    fireEvent.mouseDown(screen.getByTestId('outside-popover'));
    expect(onRequestClose).toBeCalledTimes(1);
  });

  it('does not trigger onRequestClose callback when clicking inside', () => {
    const onRequestClose = jest.fn();
    renderView({
      isOpen: true,
      onRequestClose,
    });
    fireEvent.mouseDown(screen.getByTestId('popover-content-container'));
    expect(onRequestClose).toBeCalledTimes(0);
  });

  it('triggers onRequestClose callback when escape key is triggered', () => {
    const onRequestClose = jest.fn();
    const { view } = renderView({
      isOpen: true,
      onRequestClose,
    });
    fireEvent.keyDown(view.baseElement, { key: 'escape', keyCode: 27 });
    expect(onRequestClose).toBeCalledTimes(1);
  });

  it('triggers onRequestClose callback when popover is out of viewport', () => {
    /* element is inside the viewport if the top and left value is greater than or equal to 0,
      and right value is less than or equal to window.innerWidth
      and bottom value is less than or equal to window.innerHeight */
    const targetRefObj = {
      current: {
        contains: () => true,
        getBoundingClientRect: () => {
          return {
            bottom: 35,
            height: 38,
            left: 57,
            right: 840,
            top: -1,
            width: 783,
            x: 41,
            y: -1,
            toJSON: jest.fn(),
          };
        },
      },
    };
    const onRequestClose = jest.fn();
    renderView({
      targetRef: targetRefObj,
      isOpen: true,
      onRequestClose,
    });
    expect(onRequestClose).toBeCalledTimes(1);
  });

  it('does not onRequestClose callback when popover is out of viewport', () => {
    const targetRefObj = {
      current: {
        contains: () => true,
        getBoundingClientRect: () => {
          return {
            bottom: 35,
            height: 38,
            left: 57,
            right: 840,
            top: 1,
            width: 783,
            x: 41,
            y: 1,
            toJSON: jest.fn(),
          };
        },
      },
    };
    const onRequestClose = jest.fn();
    renderView({
      targetRef: targetRefObj,
      isOpen: true,
      onRequestClose,
    });
    expect(onRequestClose).toBeCalledTimes(0);
  });

  it('does not show a beak if the prop is not provided', () => {
    renderView({
      isOpen: true,
    });

    expect(screen.queryByTestId('popover-beak')).not.toBeInTheDocument();
  });

  it('shows a beak if the prop is true', () => {
    renderView({
      isOpen: true,
      beak: 'right',
    });

    expect(screen.queryByTestId('popover-beak')).toBeInTheDocument();
  });

  it("positions with default 'below', 'left', '20', '0' value when position, align, verticalOffset, horizontalOffset props are not provided respectively", () => {
    Object.defineProperty(window, 'scrollY', { value: 1 });
    Object.defineProperty(window, 'scrollX', { value: 1 });

    const { view } = renderView({
      isOpen: true,
    });

    expect(
      pick(view.getByTestId('popover-content-container').style, ['top', 'left'])
    ).toEqual({
      top: '318px',
      left: '58px',
    });
  });

  it('positions with given position and align values when provided', () => {
    Object.defineProperty(window, 'scrollY', { value: 1 });
    Object.defineProperty(window, 'scrollX', { value: 1 });

    const { view } = renderView({
      isOpen: true,
      position: 'above',
      align: 'right',
    });

    expect(
      pick(view.getByTestId('popover-content-container').style, ['top', 'left'])
    ).toEqual({
      top: '240px',
      left: '841px',
    });
  });

  it('positions with given verticalOffset value when provided', () => {
    Object.defineProperty(window, 'scrollY', { value: 1 });
    Object.defineProperty(window, 'scrollX', { value: 1 });

    const { view } = renderView({
      isOpen: true,
      position: 'above',
      align: 'right',
      verticalOffset: 29,
    });

    expect(
      pick(view.getByTestId('popover-content-container').style, ['top', 'left'])
    ).toEqual({
      top: '231px',
      left: '841px',
    });
  });

  it('positions with given horizontalOffset value when provided', () => {
    Object.defineProperty(window, 'scrollY', { value: 1 });
    Object.defineProperty(window, 'scrollX', { value: 1 });

    const { view } = renderView({
      isOpen: true,
      position: 'above',
      align: 'right',
      horizontalOffset: 30,
    });

    expect(
      pick(view.getByTestId('popover-content-container').style, ['top', 'left'])
    ).toEqual({
      top: '240px',
      left: '871px',
    });
  });

  it('rounds positions to whole number when provided fractionally', () => {
    Object.defineProperty(window, 'scrollY', { value: 1.5 });
    Object.defineProperty(window, 'scrollX', { value: 1.5 });

    const { view } = renderView({
      isOpen: true,
      position: 'above',
      align: 'right',
      verticalOffset: 30,
    });

    expect(
      pick(view.getByTestId('popover-content-container').style, ['top', 'left'])
    ).toEqual({
      top: '230px',
      left: '842px',
    });
  });

  it('does not show a pattern if the prop is not provided', () => {
    renderView({
      isOpen: true,
    });

    expect(screen.queryByTestId('popover-pattern')).not.toBeInTheDocument();
  });

  it('shows a pattern if the prop is provided', () => {
    renderView({
      isOpen: true,
      pattern: CheckerDense,
    });

    expect(screen.queryByTestId('popover-pattern')).toBeInTheDocument();
  });
});
