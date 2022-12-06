import { Background, system, theme, variant } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';
import { ComponentProps } from 'react';
import * as React from 'react';

import { Box } from '../Box';

const outlineStyles = {
  boxShadow: `-5px 5px ${theme.colors['background-current']}, -5px 5px 0 1px ${theme.colors.black}`,
  '&:hover': {
    transform: 'translate(4px, -4px)',
    boxShadow: `-8px 8px 0 currentColor`,
  },
};

const DynamicCardWrapper = styled(Box)<CardWrapperProps>(
  variant({
    prop: 'shadow',
    base: {
      position: 'relative',
      boxShadow: `0px 0px 0 currentColor`,
      transition: 'box-shadow 200ms ease, transform 200ms ease',
    },
    variants: {
      small: {
        '&:hover': {
          transform: 'translate(2px, -2px)',
          boxShadow: `-4px 4px 0 currentColor`,
        },
      },
      medium: {
        '&:hover': {
          transform: 'translate(4px, -4px)',
          boxShadow: `-8px 8px 0 currentColor`,
        },
      },
      outline: outlineStyles,
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
    outline: outlineStyles,
  },
});

export interface CardProps
  extends Omit<ComponentProps<typeof CardWrapper>, 'outline' | 'bg'> {
  variant?: 'navy' | 'white' | 'hyper' | 'yellow' | 'beige';
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

export const Card: React.FC<CardProps> = ({ variant, ...rest }) => {
  if (!variant) {
    return (
      <DynamicCardWrapper
        border={1}
        borderColor="secondary-hover"
        bg="background"
        color="text"
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
