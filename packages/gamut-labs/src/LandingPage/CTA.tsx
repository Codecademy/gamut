import { CTAButton, FillButton } from '@codecademy/gamut';
import React from 'react';

import { DarkModeProps } from './types';

export type CTAProps = DarkModeProps & {
  href: string;
  onCtaButtonClick?: React.MouseEventHandler;
  buttonType?: 'cta' | 'regular';
};

export const CTA: React.FC<CTAProps> = ({
  buttonType = 'cta',
  ...buttonProps
}) =>
  buttonType === 'regular' ? (
    <FillButton {...buttonProps} />
  ) : (
    <CTAButton {...buttonProps} />
  );
