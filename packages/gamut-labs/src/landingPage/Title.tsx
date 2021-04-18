import { Box, Text } from '@codecademy/gamut';
import styled from '@emotion/styled';
import React from 'react';

import { DarkModeProps } from './types';
import { darkModeVariants } from './variants';

const StyledText = styled(Text)(darkModeVariants);

export type TitleProps = DarkModeProps & {
  isPageHeading?: boolean;
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
      fontSize={
        isPageHeading
          ? {
              base: 34,
              sm: 44,
              lg: 64,
            }
          : {
              base: 26,
              lg: 34,
            }
      }
      mode={mode}
    >
      {children}
    </StyledText>
  </Box>
);
