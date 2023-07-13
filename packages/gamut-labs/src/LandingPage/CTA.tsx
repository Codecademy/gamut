import { ButtonProps, CTAButton, FillButton } from '@codecademy/gamut';
import * as React from 'react';

export interface CTAProps extends Pick<ButtonProps, 'children'> {
  href: string;
  onClick?: React.MouseEventHandler;
  buttonType?: 'cta' | 'fill';
}

export const CTA: React.FC<CTAProps> = ({
  buttonType = 'cta',
  ...buttonProps
}) =>
  buttonType === 'fill' ? (
    <FillButton {...buttonProps} />
  ) : (
    <CTAButton {...buttonProps} />
  );
