import { styledOptions, system, variant } from '@codecademy/gamut-styles';
import { StyleProps, variance } from '@codecademy/variance';
import styled from '@emotion/styled';

import { appendIconToContent } from '../helpers';
import { IconComponentType, WithChildrenProp } from '../utils';
import { determineIconSize, determineIconSpacing } from './helpers';

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
      bg: 'text-secondary',
      textColor: 'background',
    },
    tertiary: {
      border: 1,
      borderColor: 'text-secondary',
      color: 'text-secondary',
      bg: 'transparent',
    },
    tertiaryFill: {
      border: 1,
      borderColor: 'text-secondary',
      color: 'text-secondary',
      bg: 'background',
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
  system.typography
);
export interface BadgeBaseProps
  extends StyleProps<typeof badgeProps>,
    StyleProps<typeof colorVariants>,
    StyleProps<typeof sizeVariants>,
    WithChildrenProp {}

const BadgeBase = styled('div', styledOptions)<BadgeBaseProps>(
  badgeProps,
  colorVariants,
  sizeVariants
);

export interface BadgeProps
  extends Partial<IconComponentType>,
    BadgeBaseProps {}

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
  return <BadgeBase {...rest}>{content}</BadgeBase>;
};
