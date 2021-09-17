import { breakpoints, timing } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Breakpoint } from '..';
import { InnerPopover } from './shared';
import { BasePopoverProps } from './types';

type HoverContainerProps = {
  /**
   * The breakpoint where hover behavior begins.
   * If this prop is omitted, the hover behavior is on for all screen sizes.
   */
  shownAt?: Exclude<Breakpoint, 'xxs'>;
};

const HoverContainer = styled.div<HoverContainerProps>`
  opacity: 0;
  visibility: hidden;

  transition: opacity ${timing.fast};
  transition-delay: ${timing.fast};

  ${({ shownAt }) => {
    const mediaQuery = shownAt
      ? `and (min-width: ${breakpoints[shownAt]})`
      : '';

    return `@media only screen ${mediaQuery} {
      opacity: 1;
      visibility: visible;
    }`;
  }}
`;

export type HoverPopoverProps = BasePopoverProps &
  HoverContainerProps & {
    /**
     * The target element around which the popover will be positioned,
     * without the need to provide your own ref to it.
     * Just provide the element and we'll do the rest
     */
    target: JSX.Element;

    popoverType?: 'hover';
  };

export const HoverPopover: React.FC<HoverPopoverProps> = ({
  children,
  target,
  shownAt,
  ...innerPopoverProps
}) => {
  const [isHovering, setIsHovering] = useState(false);

  const targetRef = useRef<HTMLDivElement>(null);

  // TODO_MS
  // Add a state variable for isOpen
  // Add a listener for mouseEnter/mouseLeave & perhaps on focus (for focus within if it bubbles)
  // Then toggle that state and conditionally render the inner popover
  // This is being done to avoid calculating a shitton of otherwise hidden popovers

  const onHoverIn = useCallback(() => {
    if (!isHovering) setIsHovering(true);
  }, [isHovering]);

  const onHoverOut = useCallback(() => {
    if (isHovering) setIsHovering(false);
  }, [isHovering]);

  const onBlur = useCallback(
    () => !targetRef.current?.contains(document.activeElement) && onHoverOut(),
    [onHoverOut]
  );

  return (
    <div
      ref={targetRef}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
      onFocus={onHoverIn}
      onBlur={onBlur}
    >
      {target}
      <HoverContainer shownAt={shownAt}>
        {isHovering && (
          <InnerPopover {...innerPopoverProps} targetRef={targetRef}>
            {children}
          </InnerPopover>
        )}
      </HoverContainer>
    </div>
  );
};
