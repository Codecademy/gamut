import { styledConfig, system } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';
import React, { ComponentProps, forwardRef } from 'react';

import { Pattern } from '../Pattern';

const beakVariants = system.variant({
  prop: 'beak',
  base: {
    p: 12,
    '&:after': {
      content: '""',
      width: '1.25rem',
      height: '1.25rem',
      bg: 'background',
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

const CardShadow = styled(Pattern)(
  system.css({
    width: 1,
    height: 1,
    position: 'absolute',
    top: '.5rem',
    left: '-.5rem',
  })
);

const CardBody = styled('div', styledConfig)<StyleProps<typeof beakVariants>>(
  system.css({
    zIndex: 1,
    position: 'relative',
    bg: 'background',
    borderRadius: '2px',
    border: 1,
    maxWidth: 1,
  }),
  beakVariants
);

export type FloatingCard = {
  className?: string;
  pattern: ComponentProps<typeof Pattern>['name'];
} & ComponentProps<typeof CardBody>;

export const FloatingCard = forwardRef<HTMLDivElement, FloatingCard>(
  ({ children, className, pattern = 'checkerDense', ...rest }, ref) => (
    <CardWrapper>
      <CardShadow name={pattern} />
      <CardBody className={className} {...rest} ref={ref}>
        {children}
      </CardBody>
    </CardWrapper>
  )
);
