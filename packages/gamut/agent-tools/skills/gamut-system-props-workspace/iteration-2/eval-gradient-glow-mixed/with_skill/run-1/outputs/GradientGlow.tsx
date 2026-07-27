import { FlexBox, FlexBoxProps } from '@codecademy/gamut';
import * as React from 'react';

export interface GradientGlowProps extends Omit<FlexBoxProps, 'children'> {
  children: React.ReactElement;
}

/**
 * GradientGlow is a decorative wrapper that centers a single icon on top of
 * a multi-stop radial gradient glow. `background` (system.background) takes
 * a raw CSS value directly, so the gradient string needs no styled() escape
 * hatch. Flex centering uses `FlexBox` rather than `Box` + `display="flex"`,
 * since FlexBox already composes that behavior.
 */
export const GradientGlow: React.FC<GradientGlowProps> = ({
  children,
  ...props
}) => (
  <FlexBox
    alignItems="center"
    justifyContent="center"
    p={24}
    background="radial-gradient(circle, #3A10E5 0%, rgba(58, 16, 229, 0.5) 45%, rgba(58, 16, 229, 0) 100%)"
    {...props}
  >
    {children}
  </FlexBox>
);
