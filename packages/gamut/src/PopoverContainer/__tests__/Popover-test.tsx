import { setupRtl } from '@codecademy/gamut-tests';
import { matchers } from '@emotion/jest';
import { fireEvent, screen } from '@testing-library/react';
import React from 'react';

import { PopoverContainer, PopoverProps, TargetRef } from '..';

expect.extend(matchers);

const mockTargetRef = (
  target?: Partial<TargetRef>,
  viewport?: Partial<ReturnType<TargetRef['getBoundingClientRect']>>
) => ({
  current: {
    contains: () => false,
    offsetHeight: 40,
    offsetWidth: 200,
    offsetLeft: 200,
    offsetTop: 100,
    ...target,
    getBoundingClientRect: () => {
      return {
        bottom: 230,
        right: 400,
        left: 400,
        top: 230,
        height: 40,
        width: 200,
        x: 57,
        y: 260,
        toJSON: () => {},
        ...viewport,
      };
    },
  },
});

const defaultProps = {
  isOpen: true,
  targetRef: mockTargetRef(),
};

const RenderPopover = (props: PopoverProps) => {
  return (
    <>
      <PopoverContainer {...props}>
        <div data-testid="popover-content">
          Howdy!
          <button aria-label="Click me!" type="button" />
        </div>
      </PopoverContainer>
      <div>
        <h1 data-testid="outside-popover">hi</h1>
      </div>
    </>
  );
};

const renderView = setupRtl(RenderPopover, defaultProps);

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
      onRequestClose,
    });
    fireEvent.mouseDown(screen.getByTestId('outside-popover'));
    expect(onRequestClose).toBeCalledTimes(1);
  });

  it('does not trigger onRequestClose callback when clicking inside', () => {
    const onRequestClose = jest.fn();
    renderView({
      onRequestClose,
    });
    fireEvent.mouseDown(screen.getByTestId('popover-content-container'));
    expect(onRequestClose).toBeCalledTimes(0);
  });

  it('triggers onRequestClose callback when escape key is triggered', () => {
    const onRequestClose = jest.fn();
    const {
      view: { baseElement },
    } = renderView({
      onRequestClose,
    });
    fireEvent.keyDown(baseElement, { key: 'escape', keyCode: 27 });
    expect(onRequestClose).toBeCalledTimes(1);
  });

  it('triggers onRequestClose callback when popover is out of viewport', () => {
    /* element is inside the viewport if the top and left value is greater than or equal to 0,
      and right value is less than or equal to window.innerWidth
      and bottom value is less than or equal to window.innerHeight */
    const targetRefObj = mockTargetRef({}, { top: -1, x: 41, y: -1 });

    const onRequestClose = jest.fn();
    renderView({
      targetRef: targetRefObj,
      onRequestClose,
    });
    expect(onRequestClose).toBeCalledTimes(1);
  });

  it('does not onRequestClose callback when popover is out of viewport', () => {
    const targetRefObj = mockTargetRef({}, { top: 1, x: 41, y: 1 });

    const onRequestClose = jest.fn();
    renderView({
      targetRef: targetRefObj,
      onRequestClose,
    });
    expect(onRequestClose).toBeCalledTimes(0);
  });

  describe('alignments', () => {
    describe('render context', () => {
      describe('portal - viewport', () => {
        it.each([
          ['top-right', { left: '600px', top: '210px' }],
          ['top-left', { left: '400px', top: '210px' }],
          ['bottom-right', { left: '600px', top: '290px' }],
          ['bottom-left', { left: '400px', top: '290px' }],
        ] as const)(
          '%s',
          (
            alignment: PopoverProps['alignment'],
            expected: Record<string, unknown>
          ) => {
            renderView({ alignment });
            expect(screen.getByTestId('popover-content-container')).toHaveStyle(
              expected
            );
          }
        );
      });
      describe('inline - parent', () => {
        it.each([
          ['top-right', { left: '400px', top: '80px' }],
          ['top-left', { left: '200px', top: '80px' }],
          ['bottom-right', { left: '400px', top: '160px' }],
          ['bottom-left', { left: '200px', top: '160px' }],
        ] as const)(
          '%s',
          (
            alignment: PopoverProps['alignment'],
            expected: Record<string, unknown>
          ) => {
            renderView({ alignment, inline: true });
            expect(screen.getByTestId('popover-content-container')).toHaveStyle(
              expected
            );
          }
        );
      });
    });

    describe('edges', () => {
      describe('outside', () => {
        it.each([
          ['top-right', 'translate(0%, -100%)'],
          ['top-left', 'translate(-100%, -100%)'],
          ['bottom-right', 'translate(0%, 0%)'],
          ['bottom-left', 'translate(-100%, 0%)'],
        ] as const)(
          '%s',
          (alignment: PopoverProps['alignment'], expected: string) => {
            renderView({ alignment });
            expect(
              screen.getByTestId('popover-content-container')
            ).toHaveStyleRule('transform', expected);
          }
        );
      });
      describe('inside', () => {
        it.each([
          ['top-right', 'translate(-100%, -100%)'],
          ['top-left', 'translate(0%, -100%)'],
          ['bottom-right', 'translate(-100%, 0%)'],
          ['bottom-left', 'translate(0%, 0%)'],
        ] as const)(
          '%s',
          (alignment: PopoverProps['alignment'], expected: string) => {
            renderView({ alignment, inside: true });
            expect(
              screen.getByTestId('popover-content-container')
            ).toHaveStyleRule('transform', expected);
          }
        );
      });
    });
    describe('offsets', () => {
      it.each([
        [5, 10, { left: '605px', top: '220px' }],
        [-15, 10, { left: '585px', top: '220px' }],
        [605, -100, { left: '1205px', top: '330px' }],
        [-25, -10, { left: '575px', top: '240px' }],
      ] as const)(
        'X Offset %i - Y Offset %i',
        (x: number, y: number, expected: Record<string, unknown>) => {
          renderView({ alignment: 'top-right', x, y });
          expect(screen.getByTestId('popover-content-container')).toHaveStyle(
            expected
          );
        }
      );
    });
  });
});
