import { FlexBox, FlexBoxProps } from '@codecademy/gamut';
import React from 'react';

export type CTAContainerProps = FlexBoxProps;

/**
 * CTAContainer
 *
 * Layout wrapper for the Teams landing page CTA banner. Wraps `FlexBox` so
 * its children are spaced with a consistent gap, and sits above the page's
 * background pattern via `position: relative` + `zIndex`.
 *
 * All styling is expressed through Gamut system props (no raw CSS):
 * - `gap`: 12px space between children (`system.flex`)
 * - `bg`: semantic background token, adapts to light/dark ColorMode (`system.color`)
 * - `borderRadius`: 8px corners (`system.border`)
 * - `position` / `zIndex`: lifts the container above the background pattern (`system.positioning`)
 */
export const CTAContainer: React.FC<CTAContainerProps> = ({
  children,
  ...props
}) => (
  <FlexBox
    gap={12}
    bg="background-primary"
    borderRadius={8}
    position="relative"
    zIndex={2}
    {...props}
  >
    {children}
  </FlexBox>
);
