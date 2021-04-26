import { Text } from '@codecademy/gamut';
import styled from '@emotion/styled';
import React from 'react';

import { DarkModeProps } from './types';
import { darkModeVariants } from './variants';

const TitleText = styled(Text)(darkModeVariants);

export type TitleProps = DarkModeProps & {
  isPageHeading?: boolean;
  className?: string;
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

export const Title: React.FC<TitleProps> = ({ isPageHeading, ...rest }) => {
  return (
    <TitleText
      maxWidth="58rem"
      {...titleProps[isPageHeading ? 'heading' : 'subheading']}
      {...rest}
    />
  );
};
