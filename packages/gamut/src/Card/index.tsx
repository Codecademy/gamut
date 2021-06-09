import { variant } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';

import { Box } from '../Box';

const cardVariants = variant({
  base: {
    border: 1,
    borderRadius: '2px',
  },
  variants: {
    yellow: {
      bg: 'yellow',
      textColor: 'navy',
    },
    navy: {
      bg: 'navy',
      textColor: 'white',
      '&:hover': {
        outline: '1px solid currentColor',
      },
    },
    white: {
      bg: 'white',
      textColor: 'navy',
    },
    hyper: {
      bg: 'hyper',
      textColor: 'white',
    },
  },
});

const shadowVariants = variant({
  prop: 'shadow',
  base: {
    position: 'relative',
    boxShadow: ({ colors }) => `0px 0px 0 ${colors.navy}`,
    transition: 'box-shadow 200ms ease, transform 200ms ease',
  },
  variants: {
    small: {
      '&:hover': {
        transform: 'translate(2px, -2px)',
        boxShadow: ({ colors }) => `-4px 4px 0 ${colors.navy}`,
      },
    },
    medium: {
      '&:hover': {
        transform: 'translate(4px, -4px)',
        boxShadow: ({ colors }) => `-8px 8px 0 ${colors.navy}`,
      },
    },
  },
});

export type CardProps = StyleProps<typeof cardVariants> &
  StyleProps<typeof shadowVariants>;

export const Card = styled(Box)<CardProps>(cardVariants, shadowVariants);

Card.defaultProps = {
  p: 16,
  variant: 'white',
};
