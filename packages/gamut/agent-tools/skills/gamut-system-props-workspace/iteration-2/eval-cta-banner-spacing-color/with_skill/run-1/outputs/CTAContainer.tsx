import type { FlexBoxProps } from '@codecademy/gamut';
import { FlexBox } from '@codecademy/gamut';
import * as React from 'react';

export type CTAContainerProps = FlexBoxProps;

/**
 * Layout container for the Teams landing page CTA banner.
 *
 * Wraps `FlexBox` with the spacing, semantic background, and layering
 * needed to sit on top of a background pattern: a 12px gap between
 * children, an 8px border radius, and `position: relative` with a
 * `z-index` of 2 so its content stacks above the pattern behind it.
 */
export const CTAContainer: React.FC<CTAContainerProps> = ({
  children,
  ...props
}) => {
  return (
    <FlexBox
      gap={12}
      bg="background-primary"
      borderRadius="lg"
      position="relative"
      zIndex={2}
      {...props}
    >
      {children}
    </FlexBox>
  );
};
