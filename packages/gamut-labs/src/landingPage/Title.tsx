import { Box } from '@codecademy/gamut';
import React from 'react';
import styled from '@emotion/styled';

import { ColorMode } from './types';
import { modeVariants } from './variants';
import { Text } from '../experimental/Text';

const StyledText = styled(Text)<{ mode?: ColorMode }>`
  ${modeVariants}
`;

export type TitleProps = {
  isPageHeading?: boolean;
  mode?: ColorMode;
  className?: string;
};

export const Title: React.FC<TitleProps> = ({
  isPageHeading,
  mode,
  className,
  children,
}) => (
  <Box maxWidth="58rem" className={className}>
    <StyledText
      as={isPageHeading ? 'h1' : 'h2'}
      fontWeight="title"
      fontSize={
        isPageHeading
          ? {
              xs: 34,
              sm: 44,
              lg: 64,
            }
          : {
              xs: 26,
              lg: 34,
            }
      }
      mode={mode}
    >
      {children}
    </StyledText>
  </Box>
);
