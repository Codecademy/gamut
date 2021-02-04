import { Box, CTAButton } from '@codecademy/gamut';
import React from 'react';

export type CTAProps = {
  href: string;
  className?: string;
  onCtaButtonClick?: (
    event: React.MouseEvent<HTMLButtonElement> &
      React.MouseEvent<HTMLLinkElement>
  ) => void;
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
