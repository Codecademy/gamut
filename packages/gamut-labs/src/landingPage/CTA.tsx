import { Box, CTAButton } from '@codecademy/gamut';
import React from 'react';

import { DarkModeProps } from './variants';

export type CTAProps = DarkModeProps & {
  href: string;
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
