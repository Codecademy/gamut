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
    width: 'min-content',
  },
  defaultVariant: 'blue',
  variants: {
    blue: {
      bg: 'blue',
      textColor: 'white',
    },
    yellow: {
      bg: 'feedback-warning',
      textColor: 'navy',
    },
    grey: {
      bg: `navy-500`,
      textColor: 'white',
    },
    hyper: {
      bg: `hyper-500`,
      textColor: 'white',
    },
    tst: {
      bg: `background`,
      textColor: 'white',
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
