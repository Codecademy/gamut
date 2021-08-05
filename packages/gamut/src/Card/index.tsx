import { Background, system, theme, variant } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';
import React from 'react';

const shadowVariants = variant({
  prop: 'shadow',
  base: {
    position: 'relative',
    boxShadow: `0px 0px 0 ${theme.colors.navy}`,
    transition: 'box-shadow 200ms ease, transform 200ms ease',
  },
  variants: {
    small: {
      '&:hover': {
        transform: 'translate(2px, -2px)',
        boxShadow: `-4px 4px 0 ${theme.colors.navy}`,
      },
    },
    medium: {
      '&:hover': {
        transform: 'translate(4px, -4px)',
        boxShadow: `-8px 8px 0 ${theme.colors.navy}`,
      },
    },
  },
});

export interface CardProps extends StyleProps<typeof shadowVariants> {
  variant?: 'yellow' | 'navy' | 'white' | 'hyper';
}

export const CardWrapper = styled(Background)<
  CardProps & { outline?: boolean }
>(
  system.css({ border: 1, borderRadius: '2px' }),
  shadowVariants,
  system.states({
    outline: {
      '&:hover': {
        outline: '1px solid currentColor',
      },
    },
  })
);

export const Card: React.FC<CardProps> = ({ variant = 'white', ...rest }) => {
  return (
    <CardWrapper bg={variant} outline={variant === 'navy'} p={16} {...rest} />
  );
};
