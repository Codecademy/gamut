import React from 'react';
import styled from '@emotion/styled';

import { CTAButton } from '@codecademy/gamut';

const CTA = styled.div`
  margin: 2rem 0 0;
`;

export type PageSectionCTAProps = {
  href: string;
  className?: string;
  testId?: string;
};

export const PageSectionCTA: React.FC<PageSectionCTAProps> = ({
  href,
  className,
  testId,
  children,
}) => (
  <CTA className={className} data-testid={testId}>
    <CTAButton href={href}>{children}</CTAButton>
  </CTA>
);
