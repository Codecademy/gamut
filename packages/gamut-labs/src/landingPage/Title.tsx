import { Heading } from '@codecademy/gamut';
import styled from '@emotion/styled';
import React from 'react';

const StyledHeading = styled(Heading)`
  max-width: 58rem;
`;

export type TitleProps = {
  isPageHeading?: boolean;
  className?: string;
  testId?: string;
};

export const Title: React.FC<TitleProps> = ({
  isPageHeading,
  className,
  testId,
  children,
}) => (
  <StyledHeading
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
    hideMargin
  >
    {children}
  </StyledHeading>
);
