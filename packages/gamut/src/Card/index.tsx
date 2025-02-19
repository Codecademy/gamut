import {
  Background,
  ColorModes,
  system,
  theme,
  useColorModes,
  variant,
} from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { ComponentProps } from 'react';
import * as React from 'react';

import { Box } from '../Box';

const outlineStyles = (mode: ColorModes) => ({
  boxShadow: `-5px 5px ${theme.colors['background-current']}, -5px 5px 0 1px ${theme.colors.black}`,
  '&:hover': {
    transform: 'translate(4px, -4px)',
    boxShadow: `-8px 8px 0 ${
      mode === 'dark' ? theme.colors['shadow-primary'] : 'currentColor'
    }`,
  },
});

const DynamicCardWrapper = styled(Box)<CardWrapperProps>(
  ({ mode = 'light', ...props }) =>
    variant({
      prop: 'shadow',
      base: {
        position: 'relative',
        transition: 'box-shadow 200ms ease, transform 200ms ease',
      },
      variants: {
        small: {
          '&:hover': {
            transform: 'translate(2px, -2px)',
            boxShadow: `-4px 4px 0 ${theme.colors['shadow-primary']}`,
          },
        },
        medium: {
          '&:hover': {
            transform: 'translate(4px, -4px)',
            boxShadow: `-8px 8px 0 ${theme.colors['shadow-primary']}`,
          },
        },
        outline: outlineStyles(mode),
      },
    })(props)
);

const shadowVariants = (mode: ColorModes) =>
  variant({
    prop: 'shadow',
    base: {
      position: 'relative',
      transition: 'box-shadow 200ms ease, transform 200ms ease',
    },
    variants: {
      small: {
        '&:hover': {
          transform: 'translate(2px, -2px)',
          boxShadow: `-4px 4px ${theme.colors['shadow-primary']}`,
        },
      },
      medium: {
        '&:hover': {
          transform: 'translate(4px, -4px)',
          boxShadow: `-8px 8px 0 ${theme.colors['shadow-primary']}`,
        },
      },
      outline: outlineStyles(mode),
    },
  });

export interface CardProps
  extends Omit<ComponentProps<typeof CardWrapper>, 'outline' | 'bg'> {
  variant?: 'navy' | 'white' | 'hyper' | 'yellow' | 'beige';
}

interface CardWrapperProps {
  outline?: boolean;
  mode?: ColorModes;
  shadow?: 'small' | 'medium' | 'outline' | false;
}

const CardWrapper = styled(Background)<CardWrapperProps>(
  ({ mode = 'light', ...props }) => ({
    ...shadowVariants(mode)(props),
    ...system.states({
      outline: {
        '&:hover': {
          outline: '1px solid currentColor',
        },
      },
    })(props),
  })
);

export const Card: React.FC<CardProps> = ({ variant, ...rest }) => {
  // mode neeeds to be overwritten if it isn't passed in
  const [mode] = useColorModes();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { mode: _, ...otherRest } = rest;

  if (!variant) {
    return (
      <DynamicCardWrapper
        border={1}
        borderColor="secondary-hover"
        borderRadius="md"
        bg="background"
        color="text"
        p={16}
        mode={mode}
        {...otherRest}
      />
    );
  }

  return (
    <CardWrapper
      bg={variant}
      border={1}
      borderColor="border-primary"
      borderRadius="md"
      p={16}
      outline={variant === 'navy'}
      mode={mode}
      {...otherRest}
    />
  );
};
