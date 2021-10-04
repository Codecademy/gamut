import { CTAButton, FillButton } from '@codecademy/gamut';
import React from 'react';

import { DarkModeProps } from './types';

export type CTAProps = DarkModeProps & {
  href: string;
  onClick?: React.MouseEventHandler;
  buttonType?: 'cta' | 'fill';
};

export const CTA: React.FC<CTAProps> = ({
  buttonType = 'cta',
  ...buttonProps
}) =>
  buttonType === 'fill' ? (
    <FillButton {...buttonProps} />
  ) : (
    <CTAButton {...buttonProps} />
  );
