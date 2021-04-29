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
  LogoProps & { variant?: 'default' | 'mini' | 'pro' }
>(({ variant = 'default', ...props }, ref) => {
  const Logo = variants[variant];
  return <Logo {...props} ref={ref} />;
});
