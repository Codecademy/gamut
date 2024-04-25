import { styledOptions, system, variant } from '@codecademy/gamut-styles';
import { StyleProps, variance } from '@codecademy/variance';
import styled from '@emotion/styled';

import { IconComponentType } from '../Button/shared';

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

 const iconSizeVariants = variant({
  prop: 'iconSize',
  defaultVariant: 'base',
  variants: {
    base: {
      height: 16,
      width: 16,
    },
    sm: {
      height: 8,
      width: 8,
    },
  },
});


export interface BadgeBaseProps
  extends StyleProps<typeof badgeProps>,
    StyleProps<typeof colorVariants>,
    StyleProps<typeof sizeVariants> {}

const BadgeBase = styled('div', styledOptions)<BadgeBaseProps>(
  badgeProps,
  colorVariants,
  sizeVariants
);

const iconSizeMap = {
  base: 16,
  sm: 8
}
export interface BadgeProps
  extends BadgeBaseProps,
  StyleProps<typeof iconSizeVariants>,
  IconComponentType {}


export const Badge: React.FC<BadgeProps> = ({
  icon: Icon,
  children,
  ...rest
}) => {
  const iconSize = rest?.size ?? 'base'
  return (
    <BadgeBase {...rest}>
      {Icon && <Icon height={16}/>}
      {children}
    </BadgeBase>
  )
}

// or something like createButtonComponent from IconButton?
// probably createButtonComp, since we don't need to redo all the current badges
