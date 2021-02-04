import { Box, CTAButton } from '@codecademy/gamut';
import React from 'react';

import { CTAOnClickCallback } from './types';

export type CTAProps = {
  href: string;
  className?: string;
  onCtaButtonClick?: CTAOnClickCallback;
};

export const CTA: React.FC<CTAProps> = ({
  href,
  className,
  onCtaButtonClick,
  children,
}) => (
  <Box marginTop={32} className={className}>
    <CTAButton href={href} onClick={onCtaButtonClick}>
      {children}
    </CTAButton>
  </Box>
);
