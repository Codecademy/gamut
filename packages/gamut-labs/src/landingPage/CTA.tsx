import { Box, CTAButton } from '@codecademy/gamut';
import React from 'react';

import { CTAOnClickCallback, DarkModeProps } from './types';

export type CTAProps = DarkModeProps & {
  href: string;
  className?: string;
  onCtaButtonClick?: CTAOnClickCallback;
};

export const CTA: React.FC<CTAProps> = ({
  href,
  mode,
  className,
  onCtaButtonClick,
  children,
}) => (
  <Box marginTop={32} className={className}>
    <CTAButton href={href} onClick={onCtaButtonClick} mode={mode}>
      {children}
    </CTAButton>
  </Box>
);
