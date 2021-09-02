import { Background, system, theme, variant } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';
import React, { ComponentProps } from 'react';

import { Box } from '..';

const DynamicCardWrapper = styled(Box)<CardWrapperProps>(
  variant({
    prop: 'shadow',
    base: {
      position: 'relative',
      boxShadow: `0px 0px 0 ${theme.colors.secondary}`,
      transition: 'box-shadow 200ms ease, transform 200ms ease',
    },
    variants: {
      small: {
        '&:hover': {
          transform: 'translate(2px, -2px)',
          boxShadow: `-4px 4px 0 ${theme.colors.secondary}`,
        },
      },
      medium: {
        '&:hover': {
          transform: 'translate(4px, -4px)',
          boxShadow: `-8px 8px 0 ${theme.colors.secondary}`,
        },
      },
    },
  })
);

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

export interface CardProps
  extends Omit<ComponentProps<typeof CardWrapper>, 'outline' | 'bg'> {
  variant?: 'navy' | 'white' | 'hyper' | 'yellow' | 'mode';
}

interface CardWrapperProps extends StyleProps<typeof shadowVariants> {
  outline?: boolean;
}

const CardWrapper = styled(Background)<CardWrapperProps>(
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
  if (variant === 'mode') {
    return (
      <DynamicCardWrapper
        border={1}
        borderColor="secondary-hover"
        bg="background"
        p={16}
        {...rest}
      />
    );
  }

  return (
    <CardWrapper
      bg={variant}
      border={1}
      borderColor="navy"
      p={16}
      outline={variant === 'navy'}
      {...rest}
    />
  );
};
