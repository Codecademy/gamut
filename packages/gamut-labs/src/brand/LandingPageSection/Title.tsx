import React from 'react';
import styled from '@emotion/styled';

import { Heading } from '@codecademy/gamut';

const Title = styled(Heading)`
  margin: 2rem 0 0;
`;

export type LandingPageSectionTitleProps = {
  isPageHeading: boolean;
  className?: string;
  testId?: string;
};

export const LandingPageSectionTitle: React.FC<LandingPageSectionTitleProps> = ({
  isPageHeading,
  className,
  testId,
  children,
}) => (
  <Title
    as={isPageHeading ? 'h1' : 'h2'}
    fontSize={
      isPageHeading
        ? {
            lg: 'xxl',
            sm: 'xl',
            xs: 'lg',
          }
        : {
            lg: 'lg',
            xs: 'md',
          }
    }
    className={className}
    testId={testId}
  >
    {children}
  </Title>
);
