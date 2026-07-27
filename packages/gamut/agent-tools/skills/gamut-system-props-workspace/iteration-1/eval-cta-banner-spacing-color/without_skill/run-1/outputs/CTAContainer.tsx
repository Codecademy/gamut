import { FlexBox, FlexBoxProps } from '@codecademy/gamut';
import React from 'react';

export type CTAContainerProps = FlexBoxProps;

/**
 * CTAContainer wraps FlexBox to lay out call-to-action content for the
 * Teams landing page. It sits above a decorative background pattern, so it
 * uses `position: relative` with a `zIndex` to guarantee correct layering.
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
