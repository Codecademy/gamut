import { Text } from '@codecademy/gamut';
import React from 'react';

export type TitleProps = {
  isPageHeading?: boolean;
};

const titleProps = {
  heading: {
    as: 'h1',
    fontSize: {
      _: 34,
      sm: 44,
      lg: 64,
    },
  },
  subheading: {
    as: 'h2',
    fontSize: {
      _: 26,
      lg: 34,
    },
  },
} as const;

export const Title: React.FC<TitleProps> = ({ isPageHeading, children }) => (
  <Text
    maxWidth="58rem"
    {...titleProps[isPageHeading ? 'heading' : 'subheading']}
  >
    {children}
  </Text>
);
