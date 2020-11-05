import React from 'react';
import styled from '@emotion/styled';

import { ButtonDeprecated } from '@codecademy/gamut';

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
    <ButtonDeprecated theme="hyper" href={href}>
      {children}
    </ButtonDeprecated>
  </CTA>
);
