import React from 'react';
import styled from '@emotion/styled';

import { CTAButton } from '@codecademy/gamut';

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
    <CTAButton
      as="a"
      // @ts-expect-error: href does not yet validate as a prop on CTAButton
      href={href}
      style={{ display: 'inline-block' }}
    >
      {children}
    </CTAButton>
  </CTA>
);
