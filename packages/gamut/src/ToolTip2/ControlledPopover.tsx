import { variant } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { isEqual } from 'lodash';
import { Boundary, Data, Offset, Placement } from 'popper.js';
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

import { isOnServer } from './isOnServer';
import { PopoverBoundary, PopoverPosition, PopoverType } from './types';
import { usePreviousProps } from './usePreviousProps';

export interface PopoverProps {
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
  children: React.ReactElement<unknown>;
  component?: React.ReactElement<unknown> | ReactNode;
  render?: () => ReactNode;
  focusable?: boolean;
  // Position for brevity, but this is preferred position, as it'll reposition if it doesn't fit.
  position?: Placement;
  // Sometimes we render a popover B inside a popover A, and don't want B to overflow A.
  // PopoverBoundary.ScrollParent fixes that. In most cases though, the default ViewPort is fine.
  boundary?: Boundary;
  // Allows you to opt out of the border and dropshadow if needed
  isChromeless?: boolean;
  // Flipping is when we move the popover from one side to another to fit into the viewport.
  // Sometimes you don't want that, so we give you a way in.
  isFlipDisabled?: boolean;
  maxWidth?: number | string;
  maxHeight?: number | string;
  showOverflowY?: boolean;
  // Simple boolean to completely avoid transitions of any kind. Useful for when we want popovers to
  // either be or not, without even dealing with 0ms timeouts for our renders.
  noTransitions?: boolean;
  // Sometimes instead of width we need to use flex styling for the targetWrappers.
  // Defaults to false.
  useFlex?: boolean;
  // Sometimes we want popovers to apply transitions when they're opened, without having to bubble up their isOpen
  // state. So we let parents pass down configurations for their totally optional transitions.

  // transitionStyles?: ControlledPopoverTransitionStyle; // TODO_MS Maybe cut out?

  // Sometimes we want to apply different offsets to the popover based on its position (top/bottom/left/right).
  // These modifiers will be used on-render to check the position and then tweak the popover's offset
  // by the value given.
  positionBasedOffsetModifiers?: ControlledPopoverPositionOffsetModifiers;
  // TODO [CW-4075]: This field makes it possible for search typeaheads disable the default "click to open"
  // logic and implement their own based on focus, while still getting the "click body/esc to close", behavior.
  // Ideally we'd have a PopoverType.Focus that would handle all of that, but it requires much more work
  // because we'd have to ensure we keep the popover when the input loses focus and the results get focus, etc.
  skipClickToOpen?: boolean;
  // Use ReactDOM.createPortal(popover, glassContainerRef), helpful to avoid any overflow logic on containing elements.
  // Please note, that since portaled popovers render into glassContainerRef, this puts them above most things,
  // even if they're being used outside of traditional glass components.
  usePortals?: boolean;
}

export interface ControlledPopoverOnlyProps {
  // This null type was added to expressly communicate that this component may accept null. If so, you'd
  // better know what you're doing and better not need to get any info whatsoever on whether you should hide/show
  // this popover from this component. Its open state is in your hands now.
  toggle: (() => void) | null;
  isOpen?: boolean;
}

// NOTE: This currently only supports modifying `top`/`bottom` & `left`/`right`, but can be expanded to support `width`, & `height`.
//    However, unless your width/height logic depends on placement & on modifying numeric values, you're better
//    off just using the top-level width/height props.
// NOTE Jr.: It is not needed to use `top` with Left/Right or `left` with Top/Bottom positioned popovers
//    (you should probably be using the -start/-end suffixes, but if they're not cutting it, go nuts).
export interface ControlledPopoverPositionOffsetModifiers {
  [PopoverPosition.Top]?: Partial<Offset>;
  [PopoverPosition.Bottom]?: Partial<Offset>;
  [PopoverPosition.Left]?: Partial<Offset>;
  [PopoverPosition.Right]?: Partial<Offset>;
}

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
    type = PopoverType.Click,
    // onHoverEnterDelay = 250,
    // onHoverExitDelay = 250,
    focusable,
    position = PopoverPosition.Bottom,
    boundary = PopoverBoundary.Viewport,
    //   isChromeless = false,
    isFlipDisabled,
    //   usePortals = false,
    //   useFlex = false,
    // transitionStyles: {
    //   [ENTERING]: style.enter,
    //   [EXITING]: style.exit,
    //   transitionDurationMS: popoverTransitionTimeMs,
    // }
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

  // If the content of the popover has changed, then we trigger an update to Popper, which repositions it.
  // Classic use-case: We're showing 5 elements in a popover, but then we're only showing 3. Without this
  // update, the popover will still be spaced to accommodate the now-missing 2 elements.
  useEffect(() => {
    if (isOpen && !isEqual(prevProps, props)) callPopperScheduleUpdate();
  });

  const handleOutsideEvent = useCallback(
    ({ target }: Event) => {
      if (popoverRef.current && !popoverRef.current.contains(target as Node))
        toggle?.();
    },
    [toggle]
  );

  // Only allow opened, type:click popovers to have a listener.
  // And return the removal function for easy management of cleanup.
  const setOutsideClickListener = useCallback(() => {
    if (type !== PopoverType.Click || !isOpen) return;

    const baseElement = getBaseElement();

    baseElement?.addEventListener('click', handleOutsideEvent, false);

    return () =>
      baseElement?.removeEventListener('click', handleOutsideEvent, false);
  }, [isOpen, type, handleOutsideEvent]);

  // On mount/update, if the listener function changes (because of type/toggle/etc)
  // then clear the old listener and attempt to attach the new one.
  useEffect(() => {
    return setOutsideClickListener();
  }, [setOutsideClickListener]);

  /**
   * To get keyboard open/close (aka hit enter to trigger onClick) for free, the target must a button or an anchor.
   * There's currently no way to apply this restriction with TypeScript, so we do it runtime and revisit in CW-3490.
   * Whitelisting would require us to enumerate all valid custom components, so instead we denylist common offenders.
   */
  if (type === PopoverType.Click && !isValidClickTarget(children)) {
    throw new Error(getPopoverErrorText(children?.type.toString() ?? null));
  }

  // For most of our popovers click actions are sufficient, so we both provide an onClick & allow them to be tabbed to.
  // const  getClickActions = (): TargetActionProps => ({
  //     tabIndex: this.props.tabIndex,
  //     onClick: this.props.toggle,
  //   });

  // TODO_MS: this is only onClick rn
  const target = children
    ? cloneElement(children, {
        onClick: toggle,
        tabIndex: focusable ? 0 : undefined,
        style: {
          cursor: 'pointer',
        },
      })
    : null;

  //   const targetWrapperClass = useFlex
  //     ? style.targetWrapperFlex
  //     : style.targetWrapper;

  const renderContentFromPopperAndTransitionChildrenProps = (
    ref: Ref<HTMLDivElement>,
    popperStyles: CSSProperties,
    placement: Placement
  ): ReactNode => {
    const {
      render: renderProp,
      component: renderComponent,
      //   isChromeless,
      //   showOverflowY,
      width,
      height,
      maxWidth,
      maxHeight,
      //   toggle,
      //   usePortals,
      //   transitionStyles,
    } = props;

    const elementToClone = renderComponent || renderProp?.();
    // const childComponent = elementToClone; // && cloneElement(elementToClone);

    // const popoverHolderClassName = combineClassNames({
    //   [style.popoverChrome]: !isChromeless,
    //   [style.showOverflowY]: showOverflowY,
    // });

    // const transitionStyle = transitionStyles[status];
    // const baseContainerClassName = combineClassNames({
    //   [style.baseContainer]: true,
    //   [transitionStyle]: !!transitionStyle,
    //   [style.isRenderedWithPortal]: usePortals,
    // });

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
        }}
      >
        <InnerDiv
          ref={ref} // For popperJS to store
          //   className={popoverHolderClassName}
          style={{
            ...popperStyles,
            width,
            height,
            maxWidth,
            maxHeight,
          }}
        >
          {/* TODO_MS: Escape hotkey to close? */}
          <div role="tooltip">
            {elementToClone}
            <Beak placement={placement} />
          </div>
        </InnerDiv>
      </div>
    );
  };

  const popperContent = (
    <Popper
      placement={position}
      //   eventsEnabled={isOpen}
      modifiers={[
        {
          name: 'arrow',
          enabled: true,
        },
        {
          name: 'preventOverflow',
          options: {
            padding: POPOVER_MARGIN * 2, // Minimum distance from boundary edge so it's not cheek-to-jowl with it before re-positioning
            boundariesElement: boundary, // What element is attempting to contain this popover
            priority: ['left', 'right', 'bottom', 'top'], // Which direction the popover should prefer to prevent overflow in most
          },
        },
        {
          name: 'offset',
          options: {
            offset: [0, 8],
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

        return (
          <div style={{ visibility: isOpen ? 'visible' : 'hidden' }}>
            {renderContentFromPopperAndTransitionChildrenProps(
              ref,
              popperStyles,
              placement
            )}
          </div>
        );
      }}
    </Popper>
  );

  return (
    <span
      ref={popoverRef}
      //   {...wrapperActionProps}
      //   className={targetWrapperClass}
      //   style={targetStyles}
    >
      <Manager>
        <Reference>
          {({ ref }) => (
            <span
              ref={ref} // className={targetWrapperClass}
            >
              {target}
            </span>
          )}
        </Reference>
        {/* {usePortals && glassContainerRef
          ? createPortal(this.renderPopperContent(), glassContainerRef)
          : this.renderPopperContent()} */}
        {popperContent}
      </Manager>
    </span>
  );
};

const onClickTargetDomElementDenylist = ['div', 'span'];
const isValidClickTarget = (children: ReactElement<unknown>): boolean =>
  !!children &&
  // Allowing non-string child types whitelists all custom components:
  (typeof children.type !== 'string' ||
    onClickTargetDomElementDenylist.indexOf(children.type) === -1);

const getPopoverErrorText = (elementType: string) =>
  `Popover targets for click-type popovers must be button or anchor for keyboard navigation to work, but is instead: ${
    elementType || 'a falsy value'
  }`;

const beakHeight = `1rem`;
const InnerDiv = styled.div`
  /* &::after {
    content: '';
    display: block;
    height: ${beakHeight};
    position: absolute;
    transform: rotate(45deg);
    width: ${beakHeight};
  }

  &::after {
    border-style: solid;

    ${variant({
    prop: 'mode',
    variants: {
      dark: { backgroundColor: 'black', borderColor: 'white' },
      light: { backgroundColor: 'white', borderColor: 'black' },
    },
  })}
  } */
`;

interface BeakProps {
  placement: Placement;
}

const Beak = styled.div<Required<BeakProps>>`
  &,
  &::before {
    position: absolute;
    width: ${beakHeight};
    height: ${beakHeight};
    background: green;
  }

  visibility: hidden;

  &::before {
    visibility: visible;
    content: '';
    transform: rotate(45deg);
  }

  ${({ placement }) => {
    if (placement.includes('top')) {
      return { bottom: `calc(${beakHeight} / -2)` };
    }

    if (placement.includes('bottom')) {
      return { top: `calc(${beakHeight} / -2)` };
    }

    if (placement.includes('left')) {
      return { right: `calc(${beakHeight} / -2)` };
    }

    if (placement.includes('right')) {
      return { left: `calc(${beakHeight} / -2)` };
    }

    return {};
  }}
`;
