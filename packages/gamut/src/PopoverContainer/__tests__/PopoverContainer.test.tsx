import { MockGamutProvider, setupRtl } from '@codecademy/gamut-tests';
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

/** Portal `getContainers` uses `document.body.offsetWidth` for `parent.right`; pin it to the mock offset parent width so horizontal insets match the inline fixture. */
const mockBodyOffsetWidthForPortal = () =>
  jest.spyOn(document.body, 'offsetWidth', 'get').mockReturnValue(500);

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
        let bodyOffsetWidthSpy: jest.SpyInstance;

        beforeEach(() => {
          bodyOffsetWidthSpy = mockBodyOffsetWidthForPortal();
        });

        afterEach(() => {
          bodyOffsetWidthSpy.mockRestore();
        });

        it.each([true, false])(
          'renders correct position styles (useLogicalProperties: $useLogicalProperties)',
          (useLogicalProperties) => {
            /** Portal insets use physical `style` (same as inline); logical CSS elsewhere does not remap them. */
            const alignmentTests: [
              PopoverContainerProps['alignment'],
              Record<string, string>
            ][] = [
              ['top-right', { left: '370px', bottom: '-130px' }],
              ['top-left', { right: '370px', bottom: '-130px' }],
              ['bottom-right', { left: '370px', top: '370px' }],
              ['bottom-left', { right: '370px', top: '370px' }],
              // 'top'/'bottom' center horizontally using a physical screen coordinate,
              // so the horizontal position is always physical `left` regardless of
              // useLogicalProperties — placement stays inline style, not variance props.
              ['top', { left: '250px', bottom: '-130px' }],
              ['left', { right: '370px', top: '250px' }],
              ['bottom', { left: '250px', top: '370px' }],
              ['right', { left: '370px', top: '250px' }],
            ];

            alignmentTests.forEach(([alignment, expected]) => {
              render(
                <MockGamutProvider useLogicalProperties={useLogicalProperties}>
                  <RenderPopover
                    {...defaultProps}
                    alignment={alignment}
                    inline={false}
                  />
                </MockGamutProvider>
              );
              expect(
                screen.getByTestId('popover-content-container')
              ).toHaveStyle(expected);
              cleanup();
            });
          }
        );
      });
      describe('inline - parent', () => {
        it.each([true, false])(
          'renders correct position styles (useLogicalProperties: $useLogicalProperties)',
          (useLogicalProperties) => {
            /** Inline: insets are merged into `style` as physical top/left/right/bottom (see PopoverContainer), so expectations stay physical even when the tree uses logical CSS elsewhere. */
            const alignmentTests: [
              PopoverContainerProps['alignment'],
              Record<string, string>
            ][] = [
              ['top-right', { left: '370px', bottom: '370px' }],
              ['top-left', { right: '370px', bottom: '370px' }],
              ['bottom-right', { left: '370px', top: '370px' }],
              ['bottom-left', { right: '370px', top: '370px' }],
              // See comment above re: physical 'left' for centered alignments.
              ['top', { left: '250px', bottom: '370px' }],
              ['left', { right: '370px', top: '250px' }],
              ['bottom', { left: '250px', top: '370px' }],
              ['right', { left: '370px', top: '250px' }],
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
            expect(screen.getByTestId('popover-content-container')).toHaveStyle(
              { transform: expected }
            );
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
            expect(screen.getByTestId('popover-content-container')).toHaveStyle(
              { transform: expected }
            );
          }
        );
      });
    });

    describe('RTL placement mirroring (getPosition)', () => {
      const container = {
        top: 150,
        left: 150,
        right: 200,
        bottom: 200,
        height: 200,
        width: 200,
      };

      const base = { container, offset: 20, x: 0, y: 0 };

      it.each([
        ['bottom-left', 'bottom-right'],
        ['bottom-right', 'bottom-left'],
        ['top-left', 'top-right'],
        ['top-right', 'top-left'],
        ['left', 'right'],
        ['right', 'left'],
      ] as const)('RTL %s matches LTR %s', (rtlPlacement, ltrMirror) => {
        expect(
          utils.getPosition({
            ...base,
            alignment: rtlPlacement,
            isRtl: true,
          })
        ).toEqual(
          utils.getPosition({
            ...base,
            alignment: ltrMirror,
            isRtl: false,
          })
        );
      });

      it('does not mirror single-axis top or bottom (horizontal center unchanged)', () => {
        expect(
          utils.getPosition({ ...base, alignment: 'top', isRtl: true })
        ).toEqual(
          utils.getPosition({ ...base, alignment: 'top', isRtl: false })
        );
        expect(
          utils.getPosition({ ...base, alignment: 'bottom', isRtl: true })
        ).toEqual(
          utils.getPosition({ ...base, alignment: 'bottom', isRtl: false })
        );
      });
    });

    describe('dirNeutralStyles', () => {
      describe('centered alignments always use physical left regardless of useLogicalProperties', () => {
        it.each([
          ['top', { left: '250px' }],
          ['bottom', { left: '250px' }],
        ] as const)(
          '%s alignment has physical left: 250px even with useLogicalProperties',
          (alignment, expected) => {
            render(
              <MockGamutProvider useLogicalProperties>
                <RenderPopover {...defaultProps} alignment={alignment} />
              </MockGamutProvider>
            );
            expect(screen.getByTestId('popover-content-container')).toHaveStyle(
              expected
            );
            cleanup();
          }
        );
      });

      describe('invertAxis transform with RTL alignment mirroring', () => {
        const container = {
          top: 150,
          left: 150,
          right: 200,
          bottom: 200,
          height: 200,
          width: 200,
        };

        it.each([
          ['top-right', false, 'translate(-100%, 0)'],
          ['top-right', true, 'translate(100%, 0)'],
          ['top-left', false, 'translate(100%, 0)'],
          ['top-left', true, 'translate(-100%, 0)'],
          ['bottom-right', false, 'translate(-100%, 0)'],
          ['bottom-right', true, 'translate(100%, 0)'],
          ['bottom-left', false, 'translate(100%, 0)'],
          ['bottom-left', true, 'translate(-100%, 0)'],
        ] as const)(
          '%s invertAxis="x" isRtl=%s → %s',
          (alignment, isRtl, expected) => {
            const result = utils.getPosition({
              alignment,
              container,
              invertAxis: 'x',
              isRtl,
            });
            expect(result.dirNeutralStyles?.transform).toBe(expected);
          }
        );
      });

      describe('transform is always applied as a physical inline style', () => {
        it.each([
          [true, 'top-right', 'translate(0, 0)'],
          [false, 'top-right', 'translate(0, 0)'],
          [true, 'top', 'translate(-50%, 0)'],
          [false, 'top', 'translate(-50%, 0)'],
          [true, 'left', 'translate(0, -50%)'],
          [false, 'left', 'translate(0, -50%)'],
        ] as const)(
          'useLogicalProperties=%s, alignment=%s → transform: %s',
          (useLogicalProperties, alignment, expected) => {
            render(
              <MockGamutProvider useLogicalProperties={useLogicalProperties}>
                <RenderPopover {...defaultProps} alignment={alignment} />
              </MockGamutProvider>
            );
            expect(screen.getByTestId('popover-content-container')).toHaveStyle(
              { transform: expected }
            );
            cleanup();
          }
        );
      });
    });

    describe('offsets', () => {
      let bodyOffsetWidthSpy: jest.SpyInstance;

      beforeEach(() => {
        bodyOffsetWidthSpy = mockBodyOffsetWidthForPortal();
      });

      afterEach(() => {
        bodyOffsetWidthSpy.mockRestore();
      });

      it.each([true, false])(
        'renders correct offset styles (useLogicalProperties: $useLogicalProperties)',
        (useLogicalProperties) => {
          /** Portal top-right: `left` = 370 + x, `bottom` = -130 + y (see portal - viewport). */
          const offsetTests: [number, number, Record<string, string>][] = [
            [5, 10, { left: '375px', bottom: '-120px' }],
            [-15, 10, { left: '355px', bottom: '-120px' }],
            [605, -100, { left: '975px', bottom: '-230px' }],
            [-25, -10, { left: '345px', bottom: '-140px' }],
          ];

          offsetTests.forEach(([x, y, expected]) => {
            render(
              <MockGamutProvider useLogicalProperties={useLogicalProperties}>
                <RenderPopover
                  {...defaultProps}
                  alignment="top-right"
                  inline={false}
                  x={x}
                  y={y}
                />
              </MockGamutProvider>
            );
            expect(screen.getByTestId('popover-content-container')).toHaveStyle(
              expected
            );
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
