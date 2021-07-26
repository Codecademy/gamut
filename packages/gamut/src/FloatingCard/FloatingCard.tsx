import { CheckerDense, PatternProps } from '@codecademy/gamut-patterns';
import { styledOptions, system } from '@codecademy/gamut-styles';
import { StyleProps, variance } from '@codecademy/variance';
import styled from '@emotion/styled';
import React, { ComponentProps, forwardRef } from 'react';

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

const CardWrapper = styled.div(
  system.css({
    maxWidth: '100%',
    position: 'relative',
    display: 'inline-block',
    textColor: 'text',
    zIndex: 1,
  })
);

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

export type FloatingCardProps = {
  className?: string;
  pattern?: React.ComponentType<PatternProps>;
} & ComponentProps<typeof CardBody>;

export const FloatingCard = forwardRef<HTMLDivElement, FloatingCardProps>(
  ({ children, className, pattern = CheckerDense, ...rest }, ref) => (
    <CardWrapper>
      <CheckerDense
        dimensions={1}
        position="absolute"
        top=".5rem"
        left="-0.5rem"
      />
      <CardBody className={className} {...rest} ref={ref}>
        {children}
      </CardBody>
    </CardWrapper>
  )
);
