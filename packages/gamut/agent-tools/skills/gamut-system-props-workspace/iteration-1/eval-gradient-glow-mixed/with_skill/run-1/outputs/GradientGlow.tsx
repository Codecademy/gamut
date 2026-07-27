import { Box, BoxProps } from '@codecademy/gamut';
import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import * as React from 'react';

// A multi-stop radial gradient can't be expressed via system props (system.background
// only covers image/size/position/repeat, and system.color is solid colors only), so
// it's the one property that needs `css()` on a styled(Box) wrapper. Every other style
// below (padding, flex layout, centering) has a direct Box prop and is passed as such.
const GradientGlowContainer = styled(Box)(
  css({
    background:
      'radial-gradient(circle, #3A10E5 0%, rgba(58, 16, 229, 0.5) 45%, rgba(58, 16, 229, 0) 100%)',
  })
);

export interface GradientGlowProps extends Omit<BoxProps, 'children'> {
  /** The single icon element to center over the gradient glow. */
  children: React.ReactElement;
}

export const GradientGlow: React.FC<GradientGlowProps> = ({
  children,
  ...props
}) => (
  <GradientGlowContainer
    alignItems="center"
    display="flex"
    justifyContent="center"
    p={24}
    {...props}
  >
    {children}
  </GradientGlowContainer>
);
