import { Box, BoxProps } from '@codecademy/gamut';
import React, { FC } from 'react';

export interface GradientGlowProps extends Omit<BoxProps, 'children'> {
  /**
   * A single icon element to render centered on top of the gradient glow.
   */
  children: React.ReactElement;
}

/**
 * `GradientGlow` is a decorative wrapper that renders a single icon centered
 * on top of a multi-stop radial gradient glow effect.
 */
export const GradientGlow: FC<GradientGlowProps> = ({ children, ...rest }) => (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="center"
    p={24}
    background="radial-gradient(circle at center, #3A10E5 0%, rgba(58, 16, 229, 0.6) 40%, rgba(58, 16, 229, 0.15) 70%, transparent 100%)"
    {...rest}
  >
    {children}
  </Box>
);
