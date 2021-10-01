import { CTAButton, FillButton } from '@codecademy/gamut';
import React from 'react';

export type CTAProps = {
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
