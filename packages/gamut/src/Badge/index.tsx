import {
  Colors,
  styledOptions,
  system,
  variant,
} from '@codecademy/gamut-styles';
import { StyleProps, variance } from '@codecademy/variance';
import styled from '@emotion/styled';

import { appendIconToContent } from '../helpers';
import { IconComponentType, WithChildrenProp } from '../utils';
import { determineIconSize, determineIconSpacing } from './helpers';

const colorVariants = variant({
  defaultVariant: 'primary',
  base: {
    alignItems: 'center',
    borderRadius: 'xl',
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
      bg: 'text-secondary',
      textColor: 'background',
    },
    tertiary: {
      bg: 'transparent',
      border: 1,
      borderColor: 'border-secondary',
      textColor: 'text-secondary',
    },
    tertiaryFill: {
      bg: 'background',
      border: 1,
      borderColor: 'border-secondary',
      textColor: 'text-secondary',
    },
    custom: {
      textColor: 'text',
    },
  },
});

const sizeVariants = variant({
  prop: 'size',
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
  system.typography,
  system.background,
  system.color
);

type StandardBadgeProps = {
  background?: never;
  bg?: never;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'tertiaryFill' | 'accent';
};

type CustomBadgeBackgroundProps = {
  background: string;
  bg?: never;
  variant: 'custom';
};

type CustomBadgeBgProps = {
  background?: never;
  bg: Colors;
  variant: 'custom';
};

type BadgeBgPropsType =
  | StandardBadgeProps
  | CustomBadgeBackgroundProps
  | CustomBadgeBgProps;

export type BadgeBaseProps = StyleProps<typeof badgeProps> &
  StyleProps<typeof colorVariants> &
  StyleProps<typeof sizeVariants> &
  BadgeBgPropsType &
  WithChildrenProp;

const BadgeBase = styled('div', styledOptions)<BadgeBaseProps>(
  badgeProps,
  colorVariants,
  sizeVariants
);

export type BadgeProps = Partial<IconComponentType> & BadgeBaseProps;

export const Badge: React.FC<BadgeProps> = ({ icon, children, ...rest }) => {
  const size = rest.size === 'sm' ? 'sm' : 'base';
  const iconSize = determineIconSize(size);
  const spacing = determineIconSpacing(size);

  const content = appendIconToContent({
    children,
    icon,
    iconAndTextGap: spacing,
    iconPosition: 'left',
    iconSize,
  });
  return <BadgeBase {...rest}>{content} cass wuz here :3</BadgeBase>;
};
