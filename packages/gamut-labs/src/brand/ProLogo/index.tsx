import React from 'react';
import { colors } from '@codecademy/gamut-styles';
import { LogoProCutout } from '../LogoProCutout';
import { LogoProCutoutTransparent } from '../LogoProCutoutTransparent';

type BaseProps = {
  backgroundColor?: keyof typeof colors;
  width?: number;
};

export type ProLogoProps =
  | (BaseProps & { variant: 'transparent' })
  | (BaseProps & { variant: 'cutout'; cutoutColor?: keyof typeof colors });

export const ProLogo: React.FC<ProLogoProps> = (props) => {
  if (props.variant === 'cutout') {
    const { variant, ...forwardedProps } = props;
    return <LogoProCutout {...forwardedProps} />;
  }

  const { variant, ...forwardedProps } = props;
  return <LogoProCutoutTransparent {...forwardedProps} />;
};
