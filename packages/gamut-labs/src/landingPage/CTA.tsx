import React from 'react';
import styled from '@emotion/styled';

import { CTAButton } from '@codecademy/gamut';

const CTAContainer = styled.div`
  margin: 2rem 0 0;
`;

export type CTAProps = {
  href: string;
  className?: string;
  testId?: string;
};

export const CTA: React.FC<CTAProps> = ({
  href,
  className,
  testId,
  children,
}) => (
  <CTAContainer className={className} data-testid={testId}>
    <CTAButton href={href}>{children}</CTAButton>
  </CTAContainer>
);
