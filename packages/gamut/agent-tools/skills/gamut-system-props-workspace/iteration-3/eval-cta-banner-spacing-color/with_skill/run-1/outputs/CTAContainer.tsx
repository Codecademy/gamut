import { FlexBox, FlexBoxProps } from '@codecademy/gamut';
import React from 'react';

export type CTAContainerProps = FlexBoxProps;

/**
 * Layout container for the Teams landing page CTA. Sits above a decorative
 * background pattern (position: relative + z-index) and lays out its
 * children with consistent spacing on a semantic, color-mode-aware surface.
 */
export const CTAContainer: React.FC<CTAContainerProps> = ({
  children,
  ...props
}) => {
  return (
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
};
