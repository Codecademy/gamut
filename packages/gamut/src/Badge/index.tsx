import {
  states,
  styledOptions,
  system,
  variant,
} from '@codecademy/gamut-styles';
import { StyleProps, variance } from '@codecademy/variance';
import styled from '@emotion/styled';

const badgeVariants = variant({
  base: {
    borderRadius: '3px',
    py: 4,
    px: 12,
    fontWeight: 400,
    display: 'inline-block',
    textAlign: 'center',
    width: 'max-content',
  },
  defaultVariant: 'blue',
  variants: {
    blue: {
      bg: 'blue',
      color: 'white',
    },
    yellow: {
      bg: 'feedback-warning',
      color: 'navy',
    },
    grey: {
      bg: `navy-500`,
      color: 'white',
    },
    hyper: {
      bg: `hyper-500`,
      color: 'white',
    },
    'in-progress': {
      border: 1,
      borderColor: 'currentColor',
      bg: 'paleBlue',
      color: 'hyper',
    },
    complete: {
      border: 1,
      borderColor: 'currentColor',
      bg: 'paleGreen',
      color: 'green',
    },
    new: {
      border: 1,
      borderColor: 'currentColor',
      bg: 'palePink',
      color: 'pink',
    },
  },
});

const badgeStates = states({
  round: {
    borderRadius: '40px',
  },
});

const badgeProps = variance.compose(
  system.space,
  system.layout,
  system.typography
);

export interface BadgeProps
  extends StyleProps<typeof badgeProps>,
    StyleProps<typeof badgeVariants>,
    StyleProps<typeof badgeStates> {}

export const Badge = styled('div', styledOptions)<BadgeProps>(
  badgeProps,
  badgeVariants,
  badgeStates
);
