import { FlexBox, FlexBoxProps } from '@codecademy/gamut';
import { forwardRef } from 'react';

export type HeroContainerProps = FlexBoxProps;

/**
 * Flex-column container for Teams landing page hero sections.
 * Wraps Gamut's `FlexBox` (a `Box` laid out with `display: flex`) using
 * system props rather than hand-written CSS, so spacing/color stay on the
 * theme's token scales and remain responsive- and ColorMode-aware.
 */
export const HeroContainer = forwardRef<HTMLDivElement, HeroContainerProps>(
  ({ children, ...props }, ref) => (
    <FlexBox ref={ref} column p={16} mt={24} color="white" {...props}>
      {children}
    </FlexBox>
  )
);

HeroContainer.displayName = 'HeroContainer';
