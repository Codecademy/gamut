import { Heading } from '@codecademy/gamut';
import styled from '@emotion/styled';
import React from 'react';

const Title = styled(Heading)`
  margin: 0;
`;

export type PageSectionTitleProps = {
  isPageHeading?: boolean;
  className?: string;
  testId?: string;
};

export const PageSectionTitle: React.FC<PageSectionTitleProps> = ({
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
