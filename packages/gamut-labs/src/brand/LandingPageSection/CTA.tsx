import React from 'react';
import styled from '@emotion/styled';

import { Button } from '@codecademy/gamut';

const CTA = styled.div`
  margin: 2rem 0 0;
`;

export type LandingPageSectionCTAProps = {
  href: string;
  className?: string;
  testId?: string;
};

export const LandingPageSectionCTA: React.FC<LandingPageSectionCTAProps> = ({
  href,
  className,
  testId,
  children,
}) => (
  <CTA className={className} data-testid={testId}>
    <Button theme="hyper" href={href}>
      {children}
    </Button>
  </CTA>
);
