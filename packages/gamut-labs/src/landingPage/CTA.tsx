import { Box, CTAButton } from '@codecademy/gamut';
import React from 'react';

import { ColorMode } from './types';

export type CTAProps = {
  href: string;
  mode?: ColorMode;
  className?: string;
  onCtaButtonClick?: () => void;
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
