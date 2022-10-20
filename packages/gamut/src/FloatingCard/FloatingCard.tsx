import { CheckerDense, PatternProps } from '@codecademy/gamut-patterns';
import { styledOptions, system } from '@codecademy/gamut-styles';
import { StyleProps, variance } from '@codecademy/variance';
import styled from '@emotion/styled';
import { Properties } from 'csstype';
import { ComponentProps, forwardRef } from 'react';
import * as React from 'react';

import { Box } from '../Box';

const cardProps = variance.compose(system.layout, system.padding);

const beakVariants = system.variant({
  prop: 'beak',
  base: {
    p: 12,
    '&:after': {
      content: '""',
      width: '1.25rem',
      height: '1.25rem',
      bg: 'inherit',
      transform: 'rotate(45deg)',
      position: 'absolute',
      borderRadiusTopLeft: '2px',
      border: 1,
      borderStyleRight: 'none',
      borderStyleBottom: 'none',
    },
  },
  variants: {
    'bottom-left': {
      '&:after': {
        bottom: 'calc(-0.625rem - 1px)',
        left: '1.5rem',
        transform: 'rotate(225deg)',
      },
    },
    'bottom-right': {
      '&:after': {
        bottom: 'calc(-0.625rem - 1px)',
        right: '1.5rem',
        transform: 'rotate(225deg)',
      },
    },
    'top-left': {
      '&:after': {
        top: 'calc(-0.625rem - 1px)',
        left: '1.5rem',
        transform: 'rotate(45deg)',
      },
    },
    'top-right': {
      '&:after': {
        top: 'calc(-0.625rem - 1px)',
        right: '1.5rem',
        transform: 'rotate(45deg)',
      },
    },
  },
});

const CardBody = styled('div', styledOptions)<
  StyleProps<typeof beakVariants> & StyleProps<typeof cardProps>
>(
  system.css({
    p: 12,
    zIndex: 1,
    position: 'relative',
    bg: 'background',
    borderRadius: '2px',
    border: 1,
    maxWidth: 1,
  }),
  beakVariants,
  cardProps
);

type FloatingCardWrapper = {
  containerDisplay?: Properties['display'];
};

export type FloatingCardProps = {
  className?: string;
  pattern?: React.ComponentType<PatternProps>;
  shadow?: 'bottomLeft' | 'bottomRight';
} & ComponentProps<typeof CardBody>;

export type FloatingCardWithWrapper = FloatingCardProps & FloatingCardWrapper;

export const FloatingCard = forwardRef<HTMLDivElement, FloatingCardWithWrapper>(
  (
    {
      children,
      className,
      pattern: Pattern = CheckerDense,
      shadow = 'bottomLeft',
      containerDisplay = 'inline-block',
      ...rest
    },
    ref
  ) => (
    <Box
      display={containerDisplay}
      position="relative"
      zIndex={1}
      maxWidth="100%"
    >
      <Pattern
        dimensions={1}
        position="absolute"
        top="0.5rem"
        left={shadow === 'bottomLeft' ? '-0.5rem' : undefined}
        right={shadow === 'bottomRight' ? '-0.5rem' : undefined}
      />
      <CardBody className={className} {...rest} ref={ref}>
        {children}
      </CardBody>
    </Box>
  )
);
