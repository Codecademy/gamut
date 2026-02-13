import { MockGamutProvider, setupRtl } from '@codecademy/gamut-tests';
import { matchers } from '@emotion/jest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';

import { PopoverContainer } from '..';
import { PopoverContainerProps, TargetRef } from '../types';
import * as utils from '../utils';
import {
  createMockDOMRect,
  createNestedScrollableParents,
  createScrollableParent,
  setupWindowDimensions,
} from './utils';

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
    expect(onRequestClose).toHaveBeenCalledTimes(1);
  });

  it('does not trigger onRequestClose callback when clicking inside', () => {
    const onRequestClose = jest.fn();
    renderView({
      inline: false,
      onRequestClose,
    });
    fireEvent.mouseDown(screen.getByTestId('popover-content-container'));
    expect(onRequestClose).toHaveBeenCalledTimes(0);
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
    expect(onRequestClose).toHaveBeenCalledTimes(1);
  });

  it('triggers onRequestClose callback when popover is out of viewport and closeOnViewportExit is true', () => {
    const targetRefObj = mockTargetRef(
      {},
      { top: -201, bottom: -1, left: 150, right: 350, x: 150, y: -201 }
    );

    const onRequestClose = jest.fn();
    renderView({
      targetRef: targetRefObj,
      onRequestClose,
      closeOnViewportExit: true,
    });
    expect(onRequestClose).toHaveBeenCalledTimes(1);
  });

  it('does not trigger onRequestClose callback when popover is in viewport', () => {
    const targetRefObj = mockTargetRef({}, { top: 1, x: 41, y: 1 });

    const onRequestClose = jest.fn();
    renderView({
      targetRef: targetRefObj,
      onRequestClose,
    });
    expect(onRequestClose).toHaveBeenCalledTimes(0);
  });

  it('does not trigger onRequestClose callback when closeOnViewportExit is false (default)', () => {
    const targetRefObj = mockTargetRef(
      {},
      { top: -201, bottom: -1, left: 150, right: 350, x: 150, y: -201 }
    );

    const onRequestClose = jest.fn();
    renderView({
      targetRef: targetRefObj,
      onRequestClose,
    });
    expect(onRequestClose).toHaveBeenCalledTimes(0);
  });

  it('triggers onRequestClose callback when closeOnViewportExit is true', () => {
    const targetRefObj = mockTargetRef(
      {},
      { top: -201, bottom: -1, left: 150, right: 350, x: 150, y: -201 }
    );

    const onRequestClose = jest.fn();
    renderView({
      targetRef: targetRefObj,
      onRequestClose,
      closeOnViewportExit: true,
    });
    expect(onRequestClose).toHaveBeenCalledTimes(1);
  });

  describe('alignments', () => {
    describe('render context', () => {
      describe('portal - viewport', () => {
        it.each([
          {
            useLogicalProperties: true,
            top: 'insetBlockStart',
            bottom: 'insetBlockEnd',
            left: 'insetInlineStart',
            right: 'insetInlineEnd',
          },
          {
            useLogicalProperties: false,
            top: 'top',
            bottom: 'bottom',
            left: 'left',
            right: 'right',
          },
        ])(
          'renders correct position styles (useLogicalProperties: $useLogicalProperties)',
          ({ useLogicalProperties, top, bottom, left, right }) => {
            const alignmentTests: [
              PopoverContainerProps['alignment'],
              Record<string, string>
            ][] = [
              ['top-right', { [left]: '370px', [bottom]: '370px' }],
              ['top-left', { [right]: '370px', [bottom]: '370px' }],
              ['bottom-right', { [left]: '370px', [top]: '370px' }],
              ['bottom-left', { [right]: '370px', [top]: '370px' }],
              ['top', { [left]: '250px', [bottom]: '370px' }],
              ['left', { [right]: '370px', [top]: '250px' }],
              ['bottom', { [left]: '250px', [top]: '370px' }],
              ['right', { [left]: '370px', [top]: '250px' }],
            ];

            alignmentTests.forEach(([alignment, expected]) => {
              render(
                <MockGamutProvider useLogicalProperties={useLogicalProperties}>
                  <RenderPopover {...defaultProps} alignment={alignment} />
                </MockGamutProvider>
              );
              expect(
                screen.getByTestId('popover-content-container')
              ).toHaveStyle(expected);
              // Clean up between iterations
              cleanup();
            });
          }
        );
      });
      describe('inline - parent', () => {
        it.each([
          {
            useLogicalProperties: true,
            top: 'insetBlockStart',
            bottom: 'insetBlockEnd',
            left: 'insetInlineStart',
            right: 'insetInlineEnd',
          },
          {
            useLogicalProperties: false,
            top: 'top',
            bottom: 'bottom',
            left: 'left',
            right: 'right',
          },
        ])(
          'renders correct position styles (useLogicalProperties: $useLogicalProperties)',
          ({ useLogicalProperties, top, bottom, left, right }) => {
            const alignmentTests: [
              PopoverContainerProps['alignment'],
              Record<string, string>
            ][] = [
              ['top-right', { [left]: '370px', [bottom]: '370px' }],
              ['top-left', { [right]: '370px', [bottom]: '370px' }],
              ['bottom-right', { [left]: '370px', [top]: '370px' }],
              ['bottom-left', { [right]: '370px', [top]: '370px' }],
              ['top', { [left]: '250px', [bottom]: '370px' }],
              ['left', { [right]: '370px', [top]: '250px' }],
              ['bottom', { [left]: '250px', [top]: '370px' }],
              ['right', { [left]: '370px', [top]: '250px' }],
            ];

            alignmentTests.forEach(([alignment, expected]) => {
              render(
                <MockGamutProvider useLogicalProperties={useLogicalProperties}>
                  <RenderPopover
                    {...defaultProps}
                    alignment={alignment}
                    inline
                  />
                </MockGamutProvider>
              );
              expect(
                screen.getByTestId('popover-content-container')
              ).toHaveStyle(expected);
              // Clean up between iterations
              cleanup();
            });
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
        {
          useLogicalProperties: true,
          bottom: 'insetBlockEnd',
          left: 'insetInlineStart',
        },
        {
          useLogicalProperties: false,
          bottom: 'bottom',
          left: 'left',
        },
      ])(
        'renders correct offset styles (useLogicalProperties: $useLogicalProperties)',
        ({ useLogicalProperties, bottom, left }) => {
          const offsetTests: [number, number, Record<string, string>][] = [
            [5, 10, { [left]: '375px', [bottom]: '380px' }],
            [-15, 10, { [left]: '355px', [bottom]: '380px' }],
            [605, -100, { [left]: '975px', [bottom]: '270px' }],
            [-25, -10, { [left]: '345px', [bottom]: '360px' }],
          ];

          offsetTests.forEach(([x, y, expected]) => {
            render(
              <MockGamutProvider useLogicalProperties={useLogicalProperties}>
                <RenderPopover
                  {...defaultProps}
                  alignment="top-right"
                  x={x}
                  y={y}
                />
              </MockGamutProvider>
            );
            expect(screen.getByTestId('popover-content-container')).toHaveStyle(
              expected
            );
            // Clean up between iterations
            cleanup();
          });
        }
      );
    });
  });

  describe('closeOnViewportExit with scrollable parents', () => {
    beforeEach(() => {
      setupWindowDimensions();
    });

    afterEach(() => {
      document.body.innerHTML = '';
      jest.restoreAllMocks();
    });

    it('findAllAdditionalScrollingParents finds scrollable parent elements', () => {
      const { target } = createScrollableParent();

      const parents = utils.findAllAdditionalScrollingParents(target);

      expect(parents.length).toBeGreaterThan(0);
    });

    it('detects target is out of view when completely above scrollable parent viewport', () => {
      const { parent, target } = createScrollableParent();

      // Target is at y=50, but parent's visible viewport starts at y=200
      jest
        .spyOn(target, 'getBoundingClientRect')
        .mockReturnValue(createMockDOMRect(50, 100, 100, 50));

      jest
        .spyOn(parent, 'getBoundingClientRect')
        .mockReturnValue(createMockDOMRect(200, 0, 500, 200));

      const targetRect = target.getBoundingClientRect();
      const result = utils.isOutOfView(targetRect, target);

      expect(result).toBe(true);
    });

    it('detects target is visible when within scrollable parent viewport', () => {
      const { parent, target } = createScrollableParent();

      // Target is within parent's visible viewport (y=250 is between parent's y=200 and y=400)
      jest
        .spyOn(target, 'getBoundingClientRect')
        .mockReturnValue(createMockDOMRect(250, 100, 100, 50));

      jest
        .spyOn(parent, 'getBoundingClientRect')
        .mockReturnValue(createMockDOMRect(200, 0, 500, 200));

      const targetRect = target.getBoundingClientRect();
      const result = utils.isOutOfView(targetRect, target);

      expect(result).toBe(false);
    });

    it('detects target is out of view in nested scrollable parents', () => {
      const { outerParent, innerParent, target } =
        createNestedScrollableParents();

      // Target is out of view in inner parent (y=500 is below inner parent's visible viewport at y=250-450)
      // but might be visible in outer parent
      jest
        .spyOn(target, 'getBoundingClientRect')
        .mockReturnValue(createMockDOMRect(500, 100, 100, 50));

      jest
        .spyOn(innerParent, 'getBoundingClientRect')
        .mockReturnValue(createMockDOMRect(250, 50, 500, 200));

      jest
        .spyOn(outerParent, 'getBoundingClientRect')
        .mockReturnValue(createMockDOMRect(100, 0, 600, 400));

      const targetRect = target.getBoundingClientRect();
      const result = utils.isOutOfView(targetRect, target);

      // Should return true because target is out of view in the inner (closer) scrollable parent
      expect(result).toBe(true);
    });

    it('detects target is visible when within nested scrollable parents', () => {
      const { outerParent, innerParent, target } =
        createNestedScrollableParents();

      // Target is visible in both inner and outer parents
      jest
        .spyOn(target, 'getBoundingClientRect')
        .mockReturnValue(createMockDOMRect(300, 100, 100, 50));

      jest
        .spyOn(innerParent, 'getBoundingClientRect')
        .mockReturnValue(createMockDOMRect(250, 50, 500, 200));

      jest
        .spyOn(outerParent, 'getBoundingClientRect')
        .mockReturnValue(createMockDOMRect(100, 0, 600, 400));

      const targetRect = target.getBoundingClientRect();
      const result = utils.isOutOfView(targetRect, target);

      // Should return false because target is visible in all scrollable parents
      expect(result).toBe(false);
    });
  });
});
