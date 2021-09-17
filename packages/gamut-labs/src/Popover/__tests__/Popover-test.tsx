import { theme } from '@codecademy/gamut-styles';
import { ThemeProvider } from '@emotion/react';
import { fireEvent, render, screen } from '@testing-library/react';
import { mount } from 'enzyme';
import React from 'react';

import { Popover, PopoverProps } from '..';

let observerFunction = jest.fn();
const mockIntersectionObserver = (obsFunction: jest.Mock<any, any>) => {
  observerFunction = obsFunction;

  return {
    observe: jest.fn(),
    disconnect: jest.fn(),
  };
};

window.IntersectionObserver = jest
  .fn()
  .mockImplementation(mockIntersectionObserver);

const baseBoundingClient = {
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

const targetRefObj = {
  current: ({
    contains: () => false,
    getBoundingClientRect: () => baseBoundingClient,
  } as unknown) as HTMLElement,
};

const onRequestClose = jest.fn();

const renderPopover = (props?: Partial<PopoverProps>) =>
  render(
    <ThemeProvider theme={theme}>
      <Popover
        isOpen
        targetRef={targetRefObj}
        onRequestClose={onRequestClose}
        {...props}
      >
        <div data-testid="popover-content">
          Howdy!
          <button aria-label="Click me!" type="button" />
        </div>
      </Popover>
      <div>
        <h1 data-testid="outside-popover">hi</h1>
      </div>
    </ThemeProvider>
  );

const mountPopover = (props?: Partial<PopoverProps>) =>
  mount(
    <ThemeProvider theme={theme}>
      <Popover
        isOpen
        targetRef={targetRefObj}
        onRequestClose={onRequestClose}
        {...props}
      >
        <div data-testid="popover-content">
          Howdy!
          <button aria-label="Click me!" type="button" />
        </div>
      </Popover>
    </ThemeProvider>
  );

const popoverIsRendered = () =>
  Boolean(screen.queryByTestId('popover-content'));

describe('Popover', () => {
  describe('ClickPopover', () => {
    it('renders null when isOpen is not true', () => {
      renderPopover({ isOpen: false });

      expect(popoverIsRendered()).toBeFalsy();
    });

    it('renders children when isOpen is true', () => {
      renderPopover();
      expect(popoverIsRendered()).toBeTruthy();
    });
  });

  describe('calls onRequestClose', () => {
    it('when clicking outside', () => {
      renderPopover();
      fireEvent.mouseDown(screen.getByTestId('outside-popover'));
      expect(onRequestClose).toBeCalledTimes(1);
    });

    it('unless clicking inside', () => {
      renderPopover();
      fireEvent.mouseDown(screen.getByTestId('popover-content-container'));
      expect(onRequestClose).toBeCalledTimes(0);
    });

    it('when escape key is triggered', () => {
      const { baseElement } = renderPopover();
      fireEvent.keyDown(baseElement, { key: 'escape', keyCode: 27 });
      expect(onRequestClose).toBeCalledTimes(1);
    });

    it('when popover is outside viewport', () => {
      renderPopover();

      observerFunction([{ isIntersecting: false }]);
      expect(onRequestClose).toBeCalledTimes(1);
    });

    it('unless popover is inside viewport', () => {
      renderPopover();

      observerFunction([{ isIntersecting: true }]);
      expect(onRequestClose).toBeCalledTimes(0);
    });
  });

  describe('renders a beak', () => {
    it('if the prop is provided', () => {
      renderPopover({ beak: 'right' });

      expect(screen.queryByTestId('popover-beak')).toBeInTheDocument();
    });

    it('unless the prop is not provided', () => {
      renderPopover();

      expect(screen.queryByTestId('popover-beak')).not.toBeInTheDocument();
    });
  });

  describe('positions', () => {
    it("with default 'below', 'left', '20', '0' value when position, align, verticalOffset, horizontalOffset props are not provided respectively", () => {
      Object.defineProperty(window, 'scrollY', { value: 1 });
      Object.defineProperty(window, 'scrollX', { value: 1 });

      const wrapped = mountPopover();

      expect(
        wrapped
          .find('[data-testid="popover-content-container"]')
          .hostNodes()
          .props()
      ).toMatchObject({
        style: {
          top: 318,
          left: 58,
        },
      });
    });

    it('with given position and align values when provided', () => {
      Object.defineProperty(window, 'scrollY', { value: 1 });
      Object.defineProperty(window, 'scrollX', { value: 1 });

      const wrapped = mountPopover({
        position: 'above',
        align: 'right',
      });

      expect(
        wrapped
          .find('[data-testid="popover-content-container"]')
          .hostNodes()
          .props()
      ).toMatchObject({
        style: {
          top: 240,
          left: 841,
        },
      });
    });

    it('with given verticalOffset value when provided', () => {
      Object.defineProperty(window, 'scrollY', { value: 1 });
      Object.defineProperty(window, 'scrollX', { value: 1 });

      const wrapped = mountPopover({
        position: 'above',
        align: 'right',
        verticalOffset: 29,
      });

      expect(
        wrapped
          .find('[data-testid="popover-content-container"]')
          .hostNodes()
          .props()
      ).toMatchObject({
        style: {
          top: 231,
          left: 841,
        },
      });
    });

    it('with given horizontalOffset value when provided', () => {
      Object.defineProperty(window, 'scrollY', { value: 1 });
      Object.defineProperty(window, 'scrollX', { value: 1 });

      const wrapped = mountPopover({
        position: 'above',
        align: 'right',
        horizontalOffset: 30,
      });

      expect(
        wrapped
          .find('[data-testid="popover-content-container"]')
          .hostNodes()
          .props()
      ).toMatchObject({
        style: {
          top: 240,
          left: 871,
        },
      });
    });

    it('round to whole number when ', () => {
      Object.defineProperty(window, 'scrollY', { value: 1.5 });
      Object.defineProperty(window, 'scrollX', { value: 1.5 });

      const wrapped = mountPopover({
        position: 'above',
        align: 'right',
        verticalOffset: 30,
      });

      expect(
        wrapped
          .find('[data-testid="popover-content-container"]')
          .hostNodes()
          .props()
      ).toMatchObject({
        style: {
          top: 230,
          left: 842,
        },
      });
    });
  });

  describe('shows a pattern', () => {
    it('if the prop is provided', () => {
      renderPopover({ pattern: 'checkerDense' });

      expect(screen.queryByTestId('popover-pattern')).toBeInTheDocument();
    });

    it('unless the prop is not provided', () => {
      renderPopover();

      expect(screen.queryByTestId('popover-pattern')).not.toBeInTheDocument();
    });
  });
});
