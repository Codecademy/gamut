import { setupRtl } from '@codecademy/gamut-tests';
import { matchers } from '@emotion/jest';
import { fireEvent, screen } from '@testing-library/react';

import { PopoverContainer } from '..';
import { PopoverContainerProps, TargetRef } from '../types';

// Add the custom matchers provided by '@emotion/jest'
expect.extend(matchers);

const defaultBounding = {
  bottom: 350,
  right: 350,
  left: 150,
  top: 150,
  height: 200,
  width: 200,
  x: 0,
  y: 0,
  toJSON: () => undefined,
};

const defaultTarget = {
  contains: () => false,
  offsetHeight: 200,
  offsetWidth: 200,
  offsetLeft: 150,
  offsetTop: 150,
};

const mockTargetRef = (
  target?: Partial<TargetRef>,
  viewport?: Partial<ReturnType<TargetRef['getBoundingClientRect']>>
) =>
  ({
    current: {
      ...defaultTarget,
      offsetParent: {
        ...defaultTarget,
        offsetWidth: 500,
        offsetHeight: 500,
      },
      getBoundingClientRect: () => ({
        ...defaultBounding,
        ...viewport,
      }),
      ...target,
    },
  } as PopoverContainerProps['targetRef']);

const defaultProps = {
  isOpen: true,
  inline: true,
  targetRef: mockTargetRef(),
} as PopoverContainerProps;

const RenderPopover = (props: PopoverContainerProps) => {
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
      inline: false,
      onRequestClose,
    });
    fireEvent.mouseDown(screen.getByTestId('outside-popover'));
    expect(onRequestClose).toBeCalledTimes(1);
  });

  it('does not trigger onRequestClose callback when clicking inside', () => {
    const onRequestClose = jest.fn();
    renderView({
      inline: false,
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
      inline: false,
      onRequestClose,
    });
    fireEvent.keyDown(baseElement, { key: 'escape', keyCode: 27 });
    expect(onRequestClose).toBeCalledTimes(1);
  });

  it('triggers onRequestClose callback when popover is out of viewport', () => {
    /* element is completely out of viewport if:
      - completely above: bottom < 0
      - completely below: top > windowHeight
      - completely to the left: right < 0
      - completely to the right: left > windowWidth */
    const targetRefObj = mockTargetRef({}, { top: -201, bottom: -1, left: 150, right: 350, x: 150, y: -201 });

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
          ['top-right', { left: '370px', bottom: '370px' }],
          ['top-left', { right: '370px', bottom: '370px' }],
          ['bottom-right', { left: '370px', top: '370px' }],
          ['bottom-left', { right: '370px', top: '370px' }],
          ['top', { left: '250px', bottom: '370px' }],
          ['left', { right: '370px', top: '250px' }],
          ['bottom', { left: '250px', top: '370px' }],
          ['right', { left: '370px', top: '250px' }],
        ] as const)(
          '%s',
          (
            alignment: PopoverContainerProps['alignment'],
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
          ['top-right', { left: '370px', bottom: '370px' }],
          ['top-left', { right: '370px', bottom: '370px' }],
          ['bottom-right', { left: '370px', top: '370px' }],
          ['bottom-left', { right: '370px', top: '370px' }],
          ['top', { left: '250px', bottom: '370px' }],
          ['left', { right: '370px', top: '250px' }],
          ['bottom', { left: '250px', top: '370px' }],
          ['right', { left: '370px', top: '250px' }],
        ] as const)(
          '%s',
          (
            alignment: PopoverContainerProps['alignment'],
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
          ['top-right', 'translate(0, 0)'],
          ['top-left', 'translate(0, 0)'],
          ['bottom-right', 'translate(0, 0)'],
          ['bottom-left', 'translate(0, 0)'],
          ['top', 'translate(-50%, 0)'],
          ['left', 'translate(0, -50%)'],
          ['bottom', 'translate(-50%, 0)'],
          ['right', 'translate(0, -50%)'],
        ] as const)(
          '%s',
          (alignment: PopoverContainerProps['alignment'], expected: string) => {
            renderView({ alignment });
            expect(
              screen.getByTestId('popover-content-container')
            ).toHaveStyleRule('transform', expected);
          }
        );
      });
      describe('inside', () => {
        it.each([
          ['top-right', 'translate(-100%, 0)'],
          ['top-left', 'translate(100%, 0)'],
          ['bottom-right', 'translate(-100%, 0)'],
          ['bottom-left', 'translate(100%, 0)'],
          ['top', 'translate(-50%, 0)'],
          ['left', 'translate(0, -50%)'],
          ['bottom', 'translate(-50%, 0)'],
          ['right', 'translate(0, -50%)'],
        ] as const)(
          '%s',
          (alignment: PopoverContainerProps['alignment'], expected: string) => {
            renderView({ alignment, invertAxis: 'x' });
            expect(
              screen.getByTestId('popover-content-container')
            ).toHaveStyleRule('transform', expected);
          }
        );
      });
    });
    describe('offsets', () => {
      it.each([
        [5, 10, { left: '375px', bottom: '380px' }],
        [-15, 10, { left: '355px', bottom: '380px' }],
        [605, -100, { left: '975px', bottom: '270px' }],
        [-25, -10, { left: '345px', bottom: '360px' }],
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
