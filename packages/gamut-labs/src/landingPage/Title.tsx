import { Heading } from '@codecademy/gamut';
import styled from '@emotion/styled';
import React from 'react';

import { ColorMode } from './types';
import { modeVariants } from './variants';

const StyledHeading = styled(Heading)<{ mode?: ColorMode }>`
  ${modeVariants}
  max-width: 58rem;
`;

export type TitleProps = {
  isPageHeading?: boolean;
  mode?: ColorMode;
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
