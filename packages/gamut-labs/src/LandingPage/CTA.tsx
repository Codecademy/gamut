import { CTAButton, FillButton } from '@codecademy/gamut';
import React from 'react';

import { DarkModeProps } from './types';

export type CTAProps = DarkModeProps & {
  href: string;
  onCtaButtonClick?: React.MouseEventHandler;
  buttonType?: 'cta' | 'regular';
};

export const CTA: React.FC<CTAProps> = ({
  href,
  mode,
  onCtaButtonClick,
  buttonType,
  children,
}) =>
  buttonType === 'regular' ? (
    <FillButton href={href} onClick={onCtaButtonClick} mode={mode}>
      {children}
    </FillButton>
  ) : (
    <CTAButton href={href} onClick={onCtaButtonClick} mode={mode}>
      {children}
    </CTAButton>
  );
