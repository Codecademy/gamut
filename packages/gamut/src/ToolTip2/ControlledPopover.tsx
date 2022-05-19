import {
  ColorModes,
  Colors,
  theme,
  timing,
  timingValues,
  variant,
} from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { useFocusWithin } from '@react-aria/interactions';
import { isEqual } from 'lodash';
import { Boundary, Offset, Placement } from 'popper.js';
import React, {
  cloneElement,
  CSSProperties,
  ReactElement,
  ReactNode,
  Ref,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { Manager, Popper, PopperChildrenProps, Reference } from 'react-popper';
import Transition, {
  ENTERED,
  ENTERING,
  EXITED,
  EXITING,
  TransitionStatus,
  UNMOUNTED,
} from 'react-transition-group/Transition';

import { isOnServer } from './isOnServer';
import { PopoverPosition, PopoverType } from './types';
import { usePreviousProps } from './usePreviousProps';

export interface PopoverProps extends SharedInnerProps {
  // Width and height strings are anything CSS-like (auto, 50vh)
  // We make width and height mandatory because we need them for positioning,
  // and to encourage a single-source of truth (i.e. avoid duplication in CSS)
  width: number | string;
  height: number | string;

  // For when you need/want to add styles to the popover target (clickable item that triggers opening)
  //   targetStyles?: CSSProperties; // TODO_MS Maybe cut out?

  type?: PopoverType;
  onHoverEnterDelay?: number;
  onHoverExitDelay?: number;
  children: ReactElement<unknown>; // JSX.Element | ReactNode;
  component?: React.ReactElement<unknown> | ReactNode;
  render?: () => ReactNode;
  focusable?: boolean;

  /** Whether the popover should use a beak element to point to the tooltip target */
  useBeak?: boolean;

  // Sometimes we render a popover B inside a popover A, and don't want B to overflow A.
  // PopoverBoundary.ScrollParent fixes that. In most cases though, the default ViewPort is fine.
  boundary?: Boundary;

  // Allows you to opt out of the border and dropshadow if needed
  isChromeless?: boolean;
  /** Flipping is when we move the popover from one side to another to fit into the viewport.
   * Sometimes you don't want that, so we give you a way in. */
  isFlipDisabled?: boolean;

  maxWidth?: number | string;
  maxHeight?: number | string;
  showOverflowY?: boolean;

  // Sometimes we want popovers to apply transitions when they're opened, without having to bubble up their isOpen
  // state. So we let parents pass down configurations for their totally optional transitions.
  transitionStyles?: ControlledPopoverTransitionStyle;

  // Simple boolean to completely avoid transitions of any kind. Useful for when we want popovers to
  // either be or not, without even dealing with 0ms timeouts for our renders.
  noTransitions?: boolean;

  // Sometimes we want to apply different offsets to the popover based on its position (top/bottom/left/right).
  // These modifiers will be used on-render to check the position and then tweak the popover's offset
  // by the value given.
  // positionBasedOffsetModifiers?: ControlledPopoverPositionOffsetModifiers;

  // Use ReactDOM.createPortal(popover, glassContainerRef), helpful to avoid any overflow logic on containing elements.
  // Please note, that since portaled popovers render into glassContainerRef, this puts them above most things,
  // even if they're being used outside of traditional glass components.
  usePortals?: boolean;
}

interface SharedInnerProps {
  /** Position for brevity, but this is preferred position, as it'll reposition if it doesn't fit. */
  position?: Placement;

  /** ColorMode override for the popover */
  mode?: ColorModes;
}

export interface ControlledPopoverTransitionStyle {
  transitionDurationMS: number;
  // TODO: Change these to the gamut magic styling rules
  [ENTERING]: CSSProperties;
  [ENTERED]?: CSSProperties;
  [EXITING]: CSSProperties;
  [EXITED]?: CSSProperties;
  [UNMOUNTED]?: never;
}

export interface ControlledPopoverOnlyProps {
  // This null type was added to expressly communicate that this component may accept null. If so, you'd
  // better know what you're doing and better not need to get any info whatsoever on whether you should hide/show
  // this popover from this component. Its open state is in your hands now.
  toggle: ((override?: boolean) => void) | null;
  isOpen?: boolean;
}

// NOTE: This currently only supports modifying `top`/`bottom` & `left`/`right`, but can be expanded to support `width`, & `height`.
//    However, unless your width/height logic depends on placement & on modifying numeric values, you're better
//    off just using the top-level width/height props.
// NOTE Jr.: It is not needed to use `top` with Left/Right or `left` with Top/Bottom positioned popovers
//    (you should probably be using the -start/-end suffixes, but if they're not cutting it, go nuts).
// export interface ControlledPopoverPositionOffsetModifiers {
//   [PopoverPosition.Top]?: Partial<Offset>;
//   [PopoverPosition.Bottom]?: Partial<Offset>;
//   [PopoverPosition.Left]?: Partial<Offset>;
//   [PopoverPosition.Right]?: Partial<Offset>;
// }

/**
 * Let's keep this constant for as long as we can to ensure UI consistency.
 */
export const POPOVER_MARGIN = 8;

const getBaseElement = () => window;

// TODO_MS: Portals using BodyPortal or a new variant that doesn't require zIndex

export const ControlledPopover: React.FC<
  PopoverProps & ControlledPopoverOnlyProps
> = (props) => {
  const {
    children,
    isOpen,
    toggle,
    type = PopoverType.Focus,
    mode = 'light', // TODO_MS: Default it to looking at what the theme is instead
    // onHoverEnterDelay = 250,
    // onHoverExitDelay = 250,
    focusable,
    position = PopoverPosition.Bottom,
    boundary = 'viewport',
    useBeak,
    noTransitions,
    isFlipDisabled,
    //   usePortals = false,
    transitionStyles = fadeStyles,
  } = props;

  const prevProps = usePreviousProps(props);

  const popoverRef = useRef<HTMLSpanElement>(null);

  const popperScheduleUpdateRef = useRef(() => null as any);
  const callPopperScheduleUpdate = () => popperScheduleUpdateRef.current?.();

  // Server does not have MutationObserver & will error otherwise, but we want it
  // set before the first render to be able to observe from the very start.
  const popoverContentMutationObserverRef = useRef<MutationObserver>(
    !isOnServer() ? new MutationObserver(callPopperScheduleUpdate) : null
  );

  const updatePopperContentMutationObserver = useCallback(
    (element: HTMLDivElement | null) => {
      popoverContentMutationObserverRef.current?.disconnect();

      if (element)
        popoverContentMutationObserverRef.current?.observe(element, {
          childList: true,
          subtree: true,
        });
    },
    []
  );

  const onPopoverExited = useCallback(
    () => updatePopperContentMutationObserver(null),
    [updatePopperContentMutationObserver]
  );

  const { focusWithinProps } = useFocusWithin({
    onFocusWithin: () => {
      console.log('INNER');
      toggle?.(true);
    },
    onBlurWithin: () => toggle?.(false),
  });

  // If the content of the popover has changed, then we trigger an update to Popper, which repositions it.
  // Classic use-case: We're showing 5 elements in a popover, but then we're only showing 3. Without this
  // update, the popover will still be spaced to accommodate the now-missing 2 elements.
  useEffect(() => {
    if (isOpen && !isEqual(prevProps, props)) callPopperScheduleUpdate();
  });

  // const handleOutsideEvent = useCallback(
  //   () => null,
  //   []
  //   // ({ target }: Event) =>
  //   //  {
  //   //   if (popoverRef.current && !popoverRef.current.contains(target as Node))
  //   //     toggle?.();
  //   // },
  //   // [toggle]
  // );

  // Only allow opened, type:click popovers to have a listener.
  // And return the removal function for easy management of cleanup.
  // const setOutsideClickListener = useCallback(() => {
  //   if (type !== PopoverType.Focus || !isOpen) return;

  //   const baseElement = getBaseElement();

  //   baseElement?.addEventListener('click', handleOutsideEvent, false);

  //   return () =>
  //     baseElement?.removeEventListener('click', handleOutsideEvent, false);
  // }, [isOpen, type, handleOutsideEvent]);

  // On mount/update, if the listener function changes (because of type/toggle/etc)
  // then clear the old listener and attempt to attach the new one.
  // useEffect(() => {
  //   return setOutsideClickListener();
  // }, [setOutsideClickListener]);

  // For most of our popovers click actions are sufficient, so we both provide an onClick & allow them to be tabbed to.
  // const  getClickActions = (): TargetActionProps => ({
  //     tabIndex: this.props.tabIndex,
  //     onClick: this.props.toggle,
  //   });

  const target = children
    ? cloneElement(children, {
        // onClick: toggle,
        tabIndex: focusable ? 0 : undefined,
        style: {
          cursor: 'pointer',
        },
      })
    : null;

  const renderContentFromPopperAndTransitionChildrenProps = ({
    ref,
    popperStyles,
    placement,
    transitionStatus,
  }: {
    ref: Ref<HTMLDivElement>;
    popperStyles: CSSProperties;
    placement: Placement;
    transitionStatus: TransitionStatus;
  }): ReactNode => {
    const {
      render: renderProp,
      component: renderComponent,
      width,
      height,
      maxWidth,
      maxHeight,
      //   usePortals,
    } = props;

    const elementToClone = renderComponent || renderProp?.();
    // const childComponent = elementToClone; // && cloneElement(elementToClone);

    const transitionCSS = transitionStyles[transitionStatus];

    return (
      <div
        ref={(element) => updatePopperContentMutationObserver(element)}
        style={{
          position: 'absolute',
          // Anything that is absolute-positioned needs a z-index and this one specfically makes sure
          // elements don't end up at the bottom of the view during animations.
          zIndex: 1,
          top: 0,
          left: 0,
          width: '100%',
          ...transitionCSS,
        }}
      >
        <div
          ref={ref} // For popperJS to store
          style={{
            ...popperStyles,
            width,
            height,
            maxWidth,
            maxHeight,
          }}
        >
          {/* TODO_MS: Escape hotkey to close? Maybe for free if we use CSS? */}
          <div
            style={{
              ...popoverColors[mode],
              padding: 16,
              borderWidth: '1px',
              borderStyle: 'solid',
              borderRadius: '3px',
            }}
          >
            {elementToClone}
            {useBeak && <Beak position={placement} mode={mode} />}
          </div>
        </div>
      </div>
    );
  };

  const popperContent = (
    <Popper
      placement={position}
      //   eventsEnabled={isOpen}
      modifiers={[
        {
          // TODO: This should be getting us our beak, but it isn't. Sad emoji
          name: 'arrow',
          enabled: true,
        },
        {
          name: 'preventOverflow',
          options: {
            padding: POPOVER_MARGIN * 2, // Minimum distance from boundary edge so it's not cheek-to-jowl with it before re-positioning
            boundary, // What element is attempting to contain this popover
            // priority: ['left', 'right', 'bottom', 'top'], // Which direction the popover should prefer to prevent overflow in most
          },
        },
        {
          name: 'offset',
          options: {
            offset: useBeak ? getOffset(position) : [0, 0],
          },
        },
        {
          name: 'flip',
          enabled: !isFlipDisabled,
        },
      ]}
    >
      {({
        ref,
        style: popperStyles,
        forceUpdate,
        placement,
      }: PopperChildrenProps) => {
        popperScheduleUpdateRef.current = forceUpdate;

        const curriedRenderContent = (transitionStatus: TransitionStatus) =>
          renderContentFromPopperAndTransitionChildrenProps({
            ref,
            popperStyles,
            placement,
            transitionStatus,
          });

        return noTransitions ? (
          // TODO_MS: actually render/not render based on isOpen
          <div style={{ visibility: isOpen ? 'visible' : 'hidden' }}>
            {curriedRenderContent(ENTERED)}
          </div>
        ) : (
          <Transition
            in={isOpen}
            timeout={transitionStyles.transitionDurationMS}
            mountOnEnter
            unmountOnExit
            onExited={onPopoverExited} // To keep our mutationObservers performant
          >
            {curriedRenderContent}
          </Transition>
        );
      }}
    </Popper>
  );

  return (
    <span ref={popoverRef} {...focusWithinProps}>
      <Manager>
        <Reference>{({ ref }) => <span ref={ref}>{target}</span>}</Reference>
        {/* {usePortals && glassContainerRef
          ? createPortal(this.renderPopperContent(), glassContainerRef)
          : this.renderPopperContent()} */}
        {popperContent}
      </Manager>
    </span>
  );
};

const baseFadeStyle = (transitionTime: number) => ({
  transition: `opacity ${transitionTime}ms`,
});

const fadeStyles: ControlledPopoverTransitionStyle = {
  transitionDurationMS: timingValues.fast,
  [ENTERING]: {
    ...baseFadeStyle(timingValues.fast),
    opacity: 0,
  },
  [ENTERED]: {
    ...baseFadeStyle(timingValues.fast),
    opacity: 1,
  },
  [EXITING]: {
    ...baseFadeStyle(timingValues.fast),
    opacity: 0,
  },
};

const getOffset = (placement: Placement): [number, number] => {
  // TODO: Maybe we want to allow callers to pass other sorts of offsets via props?
  // TODO_Definitely: Add the "default" offsets so we're not right up on the target

  if (placementIsVertical(placement)) {
    return [
      placementIsStart(placement)
        ? -beakOffset
        : placementIsEnd(placement)
        ? beakOffset
        : 0,
      placementIsTop(placement)
        ? beakHeight
        : placementIsBottom(placement)
        ? beakHeight - beakHeight / 2
        : 0,
    ];
  }

  return [
    placementIsStart(placement)
      ? -beakOffset
      : placementIsEnd(placement)
      ? beakOffset - beakHeight / 2
      : 0,
    beakHeight,
  ];
};

// const onClickTargetDomElementDenylist = ['div', 'span'];
// const isValidClickTarget = (children: ReactElement<unknown>): boolean =>
//   !!children &&
//   // Allowing non-string child types whitelists all custom components:
//   (typeof children.type !== 'string' ||
//     onClickTargetDomElementDenylist.indexOf(children.type) === -1);

// const getPopoverErrorText = (elementType: string) =>
//   `Popover targets for click-type popovers must be button or anchor for keyboard navigation to work, but is instead: ${
//     elementType || 'a falsy value'
//   }`;

const beakHeight = 16;
const beakOffset = 24;
const borderRadius = 4;

const popoverColors = {
  light: {
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.black as Colors,
  },
  dark: {
    backgroundColor: theme.colors.black,
    borderColor: theme.colors.white as Colors,
  },
};

interface BeakProps extends SharedInnerProps {}

const Beak = styled.div<Required<BeakProps>>`
  &,
  &::before {
    position: absolute;
    width: ${beakHeight}px;
    height: ${beakHeight}px;
    background: transparent;
  }

  &::before {
    content: '';
    transform: rotate(45deg);
    border-style: solid;

    ${variant({
      prop: 'mode',
      variants: popoverColors,
    })}
  }

  // TODO: These offsets are based on the prop, NOT the calculated placement from Popper
  // Thus, when the popover gets near the edge of the screen, if it prepositions, the beak is misplaced.
  // The documentation on this a bit spotty, but there should be a way to get this information.
  // Might need to render the Beak inside the popover content, and then portal it up outside of it for css positions
  // Position the beak
  ${({ position }) => {
    if (placementIsVertical(position)) {
      return placementIsStart(position)
        ? { left: `${beakOffset}px` }
        : placementIsEnd(position)
        ? { right: `${beakOffset}px` }
        : {
            // Center
            left: `calc(50% - ${beakHeight / 2}px)`,
          };
    }

    return placementIsStart(position)
      ? { top: `${beakOffset - beakHeight / 4}px` }
      : placementIsEnd(position)
      ? { bottom: `${beakOffset - beakHeight / 4}px` }
      : {
          // Center
          top: `calc(50% - ${beakHeight / 2}px)`,
        };
  }}

  // Position the beak relative to the edge of the popover
  ${({ position }) => {
    if (placementIsTop(position)) {
      return `
        bottom: ${beakHeight / 2}px;

        &::before {
          border-width: 0 1px 1px 0;
          border-bottom-right-radius: ${borderRadius}px;
        }
      `;
    }

    if (placementIsBottom(position)) {
      return `
        top: ${beakHeight / -2}px;

        &::before {
          border-width: 1px 0 0 1px;
          border-top-left-radius: ${borderRadius}px;
        }
      `;
    }

    // TODO: Other radiuses on the correct corners
    if (placementIsLeft(position)) {
      return { right: `${beakHeight / -2}px` };
    }

    if (placementIsRight(position)) {
      return { left: `${beakHeight / -2}px` };
    }
  }}
`;

const placementIsTop = (placement: Placement) => placement.includes('top');
const placementIsBottom = (placement: Placement) =>
  placement.includes('bottom');

const placementIsLeft = (placement: Placement) => placement.includes('left');
const placementIsRight = (placement: Placement) => placement.includes('right');

const placementIsStart = (placement: Placement) => placement.includes('start');
const placementIsEnd = (placement: Placement) => placement.includes('end');

const placementIsVertical = (placement: Placement) =>
  placementIsTop(placement) || placementIsBottom(placement);
