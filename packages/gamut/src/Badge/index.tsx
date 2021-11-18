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
    whiteSpace: 'nowrap',
    lineHeight: 'title',
  },
  defaultVariant: 'default',
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

const badgeStates = states({
  round: {
    borderRadius: '40px',
  },
  accent: {
    fontFamily: 'accent',
    // don't do this - <3 web-plat
    fontSize: 12 as any,
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
