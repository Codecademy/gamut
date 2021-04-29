import React, { forwardRef } from 'react';

import { LogoDefault } from './LogoDefault';
import { LogoMini } from './LogoMini';
import { LogoPro } from './LogoPro';
import { LogoProps } from './shared';

const variants = {
  pro: LogoPro,
  default: LogoDefault,
  mini: LogoMini,
};

export const Logo = forwardRef<
  SVGSVGElement,
  LogoProps & { variant?: keyof typeof variants }
>(({ variant = 'default', height = 30, ...props }, ref) => {
  const Logo = variants[variant];

  return <Logo {...props} height={height} ref={ref} />;
});
