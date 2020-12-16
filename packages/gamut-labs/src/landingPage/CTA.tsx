import { CTAButton } from '@codecademy/gamut';
import styled from '@emotion/styled';
import React from 'react';

const CTAContainer = styled.div`
  margin: 2rem 0 0;
`;

export type CTAProps = {
  href: string;
  className?: string;
  testId?: string;
  onCtaButtonClick?: () => void;
};

export const CTA: React.FC<CTAProps> = ({
  href,
  className,
  testId,
  onCtaButtonClick,
  children,
}) => (
  <CTAContainer className={className} data-testid={testId}>
    <CTAButton href={href} onClick={onCtaButtonClick}>
      {children}
    </CTAButton>
  </CTAContainer>
);
