import { Box, Text } from '@codecademy/gamut';
import styled from '@emotion/styled';
import React from 'react';

import { DarkModeProps } from './types';
import { darkModeVariants } from './variants';

const StyledText = styled(Text)<DarkModeProps>`
  ${darkModeVariants}
`;

export type TitleProps = DarkModeProps & {
  isPageHeading?: boolean;
  className?: string;
};

const titleVariants = {
  heading: {
    as: 'h1',
    fontSize: {
      base: 34,
      sm: 44,
      lg: 64,
    },
  },
  default: {
    as: 'h2',
    fontSize: {
      base: 26,
      lg: 34,
    },
  },
} as const;

export const Title: React.FC<TitleProps> = ({
  isPageHeading,
  mode,
  className,
  children,
}) => (
  <Box maxWidth="58rem" className={className}>
    <StyledText
      {...(isPageHeading ? titleVariants.heading : titleVariants.default)}
      mode={mode}
    >
      {children}
    </StyledText>
  </Box>
);
