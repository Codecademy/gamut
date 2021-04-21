import { Box, CTAButton } from '@codecademy/gamut';
import React from 'react';

import { DarkModeProps } from './types';

export type CTAProps = DarkModeProps & {
  href: string;
  className?: string;
  onCtaButtonClick?: React.MouseEventHandler;
};

export const CTA: React.FC<CTAProps> = ({
  href,
  mode,
  className,
  onCtaButtonClick,
  children,
}) => (
  <Box mt={32} className={className}>
    <CTAButton href={href} onClick={onCtaButtonClick} mode={mode}>
      {children}
    </CTAButton>
  </Box>
);
