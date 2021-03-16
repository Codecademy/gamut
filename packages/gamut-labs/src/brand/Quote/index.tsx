import { Box } from '@codecademy/gamut';
import { pxRem, variant } from '@codecademy/gamut-styles';
import { HandlerProps } from '@codecademy/gamut-system';
import styled from '@emotion/styled';
import React from 'react';

import orangeQuotes from '../assets/orangeQuotes.svg';
import purpleQuotes from '../assets/purpleQuotes.svg';

const quoteVariants = variant({
  prop: 'mode',
  default: 'light',
  variants: {
    dark: {
      textColor: 'white',
    },
    light: {
      textColor: 'blue-900',
    },
  },
});

type QuoteStyleProps = HandlerProps<typeof quoteVariants>;

type QuoteProps = {
  text: string;
} & QuoteStyleProps;

const Container = styled(Box)<QuoteStyleProps>`
  ${quoteVariants}
`;

const QuoteIcon = styled.img`
  display: block;
  margin-bottom: -2.5rem;
`;

const Text = styled.q`
  position: relative;
  quotes: none;
  font-size: ${pxRem(30)};
  line-height: ${pxRem(42)};
`;

export const Quote: React.FC<QuoteProps> = ({ text, mode }) => (
  <Container position="relative" mode={mode}>
    <QuoteIcon alt="" src={mode === 'dark' ? purpleQuotes : orangeQuotes} />
    <Text>{text}</Text>
  </Container>
);
