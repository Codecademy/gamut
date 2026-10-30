import { FlexBox, FlexBoxProps } from '@codecademy/gamut';
import React from 'react';

export interface GradientGlowProps extends Omit<FlexBoxProps, 'children'> {
  /**
   * A single icon element rendered centered within the glow.
   */
  children: React.ReactElement;
}

/**
 * GradientGlow is a decorative wrapper that centers a single icon inside a
 * soft, multi-stop radial gradient "glow" — solid purple at the center,
 * fading through a mid-tone, and out to fully transparent at the edges.
 */
export const GradientGlow: React.FC<GradientGlowProps> = ({
  children,
  ...rest
}) => (
  <FlexBox
    center
    padding={24}
    backgroundImage="radial-gradient(circle, #3A10E5 0%, rgba(58, 16, 229, 0.5) 45%, rgba(58, 16, 229, 0) 100%)"
    {...rest}
  >
    {children}
  </FlexBox>
);
