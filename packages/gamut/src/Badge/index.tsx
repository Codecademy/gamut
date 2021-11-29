import {
  states,
  styledOptions,
  system,
  variant,
} from '@codecademy/gamut-styles';
import { StyleProps, variance } from '@codecademy/variance';
import styled from '@emotion/styled';

const colorVariants = variant({
  defaultVariant: 'default',
  base: {
    alignItems: 'center',
    borderRadius: '3px',
    fontWeight: 400,
    display: 'flex',
    justifyContent: 'center',
    px: 8,
    width: 'min-content',
    whiteSpace: 'nowrap',
  },
  variants: {
    default: {
      bg: `text`,
      textColor: 'background',
    },
    blue: {
      bg: 'blue',
      textColor: 'white',
    },
    yellow: {
      bg: 'feedback-warning',
      textColor: 'navy',
    },
    grey: {
      bg: `text-disabled`,
      textColor: 'white',
    },
    hyper: {
      bg: `hyper-500`,
      textColor: 'white',
    },
    stroke: {
      border: 1,
      borderColor: 'text-disabled',
      color: 'text-disabled',
      bg: 'transparent',
    },
  },
});

const sizeVariants = variant({
  prop: 'size',
  defaultVariant: 'base',
  variants: {
    base: {
      height: '1.5rem',
      fontSize: 16,
    },
    sm: {
      height: `1rem`,
      // the powers that be told us this was okay. please don't do this - <3 web-plat
      fontSize: 12 as any,
    },
  },
});

const badgeStates = states({
  round: {
    borderRadius: '40px',
  },
  accent: {
    fontFamily: 'accent',
  },
});

const badgeProps = variance.compose(
  system.space,
  system.layout,
  system.typography
);

export interface BadgeProps
  extends StyleProps<typeof badgeProps>,
    StyleProps<typeof colorVariants>,
    StyleProps<typeof sizeVariants>,
    StyleProps<typeof badgeStates> {}

export const Badge = styled('div', styledOptions)<BadgeProps>(
  badgeProps,
  colorVariants,
  sizeVariants,
  badgeStates
);
