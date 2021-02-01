import { Heading } from '@codecademy/gamut';
import { colors } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

const StyledHeading = styled(Heading)<{ mode?: 'dark' | 'light' }>`
  max-width: 58rem;
  ${({ mode }) => mode === 'dark' && `color: ${colors.beige};`}
`;

export type TitleProps = {
  isPageHeading?: boolean;
  mode?: 'dark' | 'light';
  className?: string;
  testId?: string;
};

export const Title: React.FC<TitleProps> = ({
  isPageHeading,
  mode,
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
    mode={mode}
    hideMargin
  >
    {children}
  </StyledHeading>
);
