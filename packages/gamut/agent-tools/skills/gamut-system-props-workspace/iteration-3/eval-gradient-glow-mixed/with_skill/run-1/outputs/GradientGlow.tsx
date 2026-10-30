import { Box, BoxProps } from '@codecademy/gamut';
import * as React from 'react';

export interface GradientGlowProps extends Omit<BoxProps, 'children'> {
  /** The single icon element to center over the gradient glow. */
  children: React.ReactElement;
}

/**
 * GradientGlow is a decorative wrapper that centers a single icon on top of
 * a multi-stop radial gradient glow fading from #3A10E5 at the center to
 * transparent at the edges.
 *
 * `background` (system.background) takes a raw CSS value directly, so the
 * gradient string is passed as a plain prop — no styled() escape hatch is
 * needed. `display`, `alignItems`, and `justifyContent` (system.flex) and
 * `p` (system.space) are also plain Box props, since Box already composes
 * every group this component needs.
 */
export const GradientGlow: React.FC<GradientGlowProps> = ({
  children,
  ...props
}) => (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="center"
    p={24}
    background="radial-gradient(circle, #3A10E5 0%, rgba(58, 16, 229, 0.5) 45%, rgba(58, 16, 229, 0) 100%)"
    {...props}
  >
    {children}
  </Box>
);
