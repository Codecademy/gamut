import { Box } from '@codecademy/gamut';
import React from 'react';

import { Text } from '../experimental/Text';

export type TitleProps = {
  isPageHeading?: boolean;
  className?: string;
};

export const Title: React.FC<TitleProps> = ({
  isPageHeading,
  className,
  children,
}) => (
  <Box maxWidth="58rem" className={className}>
    <Text
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
      textColor="navy"
    >
      {children}
    </Text>
  </Box>
);
