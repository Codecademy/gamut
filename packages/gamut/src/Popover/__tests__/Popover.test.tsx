import { CheckerDense } from '@codecademy/gamut-patterns';
import { theme } from '@codecademy/gamut-styles';
import { setupRtl } from '@codecademy/gamut-tests';
import { ThemeProvider } from '@emotion/react';
import { fireEvent, waitFor } from '@testing-library/react';

import { Popover, PopoverProps } from '..';

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

const PopoverTest = (props?: Partial<PopoverProps>) => (
  <ThemeProvider theme={theme}>
    <Popover
      {...({
        isOpen: true,
        targetRef: targetRefObj,
        ...props,
      } as PopoverProps)}
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

const popoverIsRendered = (view: ReturnType<typeof renderView>['view']) => {
  return Boolean(view.queryByTestId('popover-content'));
};

const renderView = setupRtl(PopoverTest);

/**
 * Popover tests use a mock `targetRef` (not a real Element), so `useElementDir` resolves
 * from `document.documentElement`. Mirror tests set `dir` there to simulate LTR/RTL.
 */
function setupRtlMirrorScroll() {
  document.documentElement.setAttribute('dir', 'ltr');
  Object.defineProperty(window, 'scrollY', { value: 1 });
  Object.defineProperty(window, 'scrollX', { value: 1 });
}

const sideCenterFloatingProps = {
  position: 'center' as const,
  beak: 'center' as const,
  variant: 'secondary' as const,
  skipFocusTrap: true as const,
};

async function expectMirrorHorizontalLeft(
  ltrProps: Partial<PopoverProps>,
  rtlProps: Partial<PopoverProps>
) {
  document.documentElement.setAttribute('dir', 'ltr');
  const { view: viewLtr } = renderView({
    isOpen: true,
    ...ltrProps,
  });
  const ltrEl = viewLtr.getByTestId('popover-content-container');
  await waitFor(() => {
    expect(ltrEl.style.left).toMatch(/\d+px/);
  });
  const ltrLeft = ltrEl.style.left;
  viewLtr.unmount();

  document.documentElement.setAttribute('dir', 'rtl');
  const { view: viewRtl } = renderView({
    isOpen: true,
    ...rtlProps,
  });
  const rtlEl = viewRtl.getByTestId('popover-content-container');
  await waitFor(() => {
    expect(rtlEl.style.left).toMatch(/\d+px/);
  });
  expect(rtlEl.style.left).toBe(ltrLeft);
  viewRtl.unmount();
}

describe('Popover', () => {
  it('renders null when isOpen is not true', () => {
    const { view } = renderView({ isOpen: false });

    expect(popoverIsRendered(view)).toBeFalsy();
  });

  it('renders children when isOpen is true', () => {
    const { view } = renderView({ isOpen: true });
    expect(popoverIsRendered(view)).toBeTruthy();
  });

  it('triggers onRequestClose callback when clicking outside', () => {
    const onRequestClose = jest.fn();
    const { view } = renderView({
      isOpen: true,
      onRequestClose,
    });
    fireEvent.mouseDown(view.getByTestId('outside-popover'));
    expect(onRequestClose).toHaveBeenCalledTimes(1);
  });

  it('does not trigger onRequestClose callback when clicking inside', () => {
    const onRequestClose = jest.fn();
    const { view } = renderView({
      isOpen: true,
      onRequestClose,
    });
    fireEvent.mouseDown(view.getByTestId('popover-content-container'));
    expect(onRequestClose).not.toHaveBeenCalled();
  });

  it('triggers onRequestClose callback when escape key is triggered', () => {
    const onRequestClose = jest.fn();
    const { view } = renderView({
      isOpen: true,
      onRequestClose,
    });
    fireEvent.keyDown(view.container, { key: 'escape', keyCode: 27 });
    expect(onRequestClose).toHaveBeenCalledTimes(1);
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

    expect(onRequestClose).toHaveBeenCalledTimes(1);
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

    expect(onRequestClose).not.toHaveBeenCalled();
  });

  it('does not show a beak if the prop is not provided', () => {
    const { view } = renderView({
      isOpen: true,
    });

    expect(view.queryByTestId('popover-beak')).toBeNull();
  });

  it('shows a beak if the prop is true', () => {
    const { view } = renderView({
      isOpen: true,
      beak: 'right',
    });

    view.getByTestId('popover-beak');
  });

  it("positions with default 'below', 'left', '20', '0' value when position, align, verticalOffset, horizontalOffset props are not provided respectively", () => {
    Object.defineProperty(window, 'scrollY', { value: 1 });
    Object.defineProperty(window, 'scrollX', { value: 1 });

    const { view } = renderView({
      isOpen: true,
    });

    const popoverContentContainer = view.getByTestId(
      'popover-content-container'
    );

    expect(popoverContentContainer).toHaveStyle({ top: '318px', left: '58px' });
  });

  it('positions with given position and align values when provided', () => {
    Object.defineProperty(window, 'scrollY', { value: 1 });
    Object.defineProperty(window, 'scrollX', { value: 1 });

    const { view } = renderView({
      isOpen: true,
      position: 'above',
      align: 'right',
    });

    const popoverContentContainer = view.getByTestId(
      'popover-content-container'
    );

    expect(popoverContentContainer).toHaveStyle({
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

    const popoverContentContainer = view.getByTestId(
      'popover-content-container'
    );

    expect(popoverContentContainer).toHaveStyle({
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

    const popoverContentContainer = view.getByTestId(
      'popover-content-container'
    );

    expect(popoverContentContainer).toHaveStyle({
      top: '240px',
      left: '871px',
    });
  });

  it('positions round to whole number when ', () => {
    Object.defineProperty(window, 'scrollY', { value: 1.5 });
    Object.defineProperty(window, 'scrollX', { value: 1.5 });

    const { view } = renderView({
      isOpen: true,
      position: 'above',
      align: 'right',
      verticalOffset: 30,
    });

    const popoverContentContainer = view.getByTestId(
      'popover-content-container'
    );

    expect(popoverContentContainer).toHaveStyle({
      top: '230px',
      left: '842px',
    });
  });

  it('does not show a pattern if the prop is not provided', () => {
    const { view } = renderView({
      isOpen: true,
    });

    expect(view.queryByTestId('popover-pattern')).toBeNull();
  });

  it('shows a pattern if the prop is provided', () => {
    const { view } = renderView({
      isOpen: true,
      pattern: CheckerDense,
    });

    view.getByTestId('popover-pattern');
  });
});

describe('Popover RTL (position center)', () => {
  beforeEach(setupRtlMirrorScroll);

  afterEach(() => {
    document.documentElement.removeAttribute('dir');
  });

  it('align left in RTL uses the same horizontal offset as align right in LTR', async () => {
    await expectMirrorHorizontalLeft(
      { ...sideCenterFloatingProps, align: 'right' },
      { ...sideCenterFloatingProps, align: 'left' }
    );
  });

  it('align right in RTL uses the same horizontal offset as align left in LTR', async () => {
    await expectMirrorHorizontalLeft(
      { ...sideCenterFloatingProps, align: 'left' },
      { ...sideCenterFloatingProps, align: 'right' }
    );
  });
});

describe('Popover RTL (position above / below)', () => {
  beforeEach(setupRtlMirrorScroll);

  afterEach(() => {
    document.documentElement.removeAttribute('dir');
  });

  it('above: align left in RTL uses the same horizontal offset as align right in LTR', async () => {
    await expectMirrorHorizontalLeft(
      { position: 'above', align: 'right', skipFocusTrap: true },
      { position: 'above', align: 'left', skipFocusTrap: true }
    );
  });

  it('below: align right in RTL uses the same horizontal offset as align left in LTR', async () => {
    await expectMirrorHorizontalLeft(
      { position: 'below', align: 'left', skipFocusTrap: true },
      { position: 'below', align: 'right', skipFocusTrap: true }
    );
  });
});
