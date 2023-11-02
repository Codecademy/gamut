import { styledOptions, system, variant } from '@codecademy/gamut-styles';
import { StyleProps, variance } from '@codecademy/variance';
import styled from '@emotion/styled';

const colorVariants = variant({
  defaultVariant: 'primary',
  base: {
    alignItems: 'center',
    borderRadius: '40px',
    fontFamily: 'accent',
    fontWeight: 400,
    display: 'flex',
    justifyContent: 'center',
    px: 8,
    width: 'min-content',
    whiteSpace: 'nowrap',
  },
  variants: {
    primary: {
      bg: `text`,
      textColor: 'background',
    },
    accent: {
      bg: 'yellow',
      textColor: 'navy',
    },
    secondary: {
      bg: `text-disabled`,
      textColor: 'background',
    },
    tertiary: {
      border: 1,
      borderColor: 'secondary',
      color: 'secondary',
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
      fontSize: 14,
      lineHeight: 0,
    },
    sm: {
      height: `1rem`,
      // the powers that be told us this was okay. please don't do this. seriously. - <3 web-plat
      fontSize: 10 as any,
    },
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
    StyleProps<typeof sizeVariants> {}

export const Badge = styled('div', styledOptions)<BadgeProps>(
  badgeProps,
  colorVariants,
  sizeVariants
);
