import { theme } from '@codecademy/gamut-styles';
import { ThemeProvider } from '@emotion/react';
import { fireEvent, render, screen } from '@testing-library/react';
import { mount } from 'enzyme';
import React from 'react';

import { Popover, PopoverProps } from '..';

const mockIntersectionObserver = () => ({
  observe: jest.fn(),
  disconnect: jest.fn(),
});

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

const renderPopover = (props?: Partial<PopoverProps>) => {
  return render(
    <ThemeProvider theme={theme}>
      <Popover isOpen targetRef={targetRefObj} {...props}>
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
};

const mountPopover = (props?: Partial<PopoverProps>) => {
  return mount(
    <ThemeProvider theme={theme}>
      <Popover isOpen targetRef={targetRefObj} {...props}>
        <div data-testid="popover-content">
          Howdy!
          <button aria-label="Click me!" type="button" />
        </div>
      </Popover>
    </ThemeProvider>
  );
};

const popoverIsRendered = () => {
  return Boolean(screen.queryByTestId('popover-content'));
};

describe('Popover', () => {
  describe('ClickPopover', () => {
    it('renders null when isOpen is not true', () => {
      renderPopover({ isOpen: false });

      expect(popoverIsRendered()).toBeFalsy();
    });

    it('renders children when isOpen is true', () => {
      renderPopover({ isOpen: true });
      expect(popoverIsRendered()).toBeTruthy();
    });
  });

  describe('calls onRequestClose', () => {
    it('when clicking outside', () => {
      renderPopover({
        isOpen: true,
        onRequestClose,
      });
      fireEvent.mouseDown(screen.getByTestId('outside-popover'));
      expect(onRequestClose).toBeCalledTimes(1);
    });

    it('unless clicking inside', () => {
      renderPopover({
        isOpen: true,
        onRequestClose,
      });
      fireEvent.mouseDown(screen.getByTestId('popover-content-container'));
      expect(onRequestClose).toBeCalledTimes(0);
    });

    it('when escape key is triggered', () => {
      const { baseElement } = renderPopover({
        isOpen: true,
        onRequestClose,
      });
      fireEvent.keyDown(baseElement, { key: 'escape', keyCode: 27 });
      expect(onRequestClose).toBeCalledTimes(1);
    });

    it('when popover is inside viewport', () => {
      /* element is inside the viewport if the top and left value is greater than or equal to 0,
        and right value is less than or equal to window.innerWidth
        and bottom value is less than or equal to window.innerHeight */
      const targetRefObj = {
        current: ({
          contains: () => true,
          getBoundingClientRect: () => ({
            ...baseBoundingClient,
            top: -1,
            y: -1,
          }),
        } as unknown) as HTMLElement,
      };
      renderPopover({
        targetRef: targetRefObj,
        isOpen: true,
        onRequestClose,
      });
      expect(onRequestClose).toBeCalledTimes(1);
    });

    it('unless popover is out of viewport', () => {
      const targetRefObj = {
        current: ({
          contains: () => true,
          getBoundingClientRect: () => ({
            ...baseBoundingClient,
            top: 1,
            y: 1,
          }),
        } as unknown) as HTMLElement,
      };
      renderPopover({
        targetRef: targetRefObj,
        isOpen: true,
        onRequestClose,
      });
      expect(onRequestClose).toBeCalledTimes(0);
    });
  });

  describe('renders a beak', () => {
    it('if the prop is provided', () => {
      renderPopover({ isOpen: true, beak: 'right' });

      expect(screen.queryByTestId('popover-beak')).toBeInTheDocument();
    });

    it('unless the prop is not provided', () => {
      renderPopover({ isOpen: true });

      expect(screen.queryByTestId('popover-beak')).not.toBeInTheDocument();
    });
  });

  describe('positions', () => {
    it("with default 'below', 'left', '20', '0' value when position, align, verticalOffset, horizontalOffset props are not provided respectively", () => {
      Object.defineProperty(window, 'scrollY', { value: 1 });
      Object.defineProperty(window, 'scrollX', { value: 1 });

      const wrapped = mountPopover({
        isOpen: true,
      });

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
        isOpen: true,
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
        isOpen: true,
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
        isOpen: true,
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
        isOpen: true,
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
      renderPopover({
        isOpen: true,
        pattern: 'checkerDense',
      });

      expect(screen.queryByTestId('popover-pattern')).toBeInTheDocument();
    });

    it('unless the prop is not provided', () => {
      renderPopover({ isOpen: true });

      expect(screen.queryByTestId('popover-pattern')).not.toBeInTheDocument();
    });
  });
});
