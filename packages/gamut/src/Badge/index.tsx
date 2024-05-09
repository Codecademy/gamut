import { styledOptions, system, variant } from '@codecademy/gamut-styles';
import { StyleProps, variance } from '@codecademy/variance';
import styled from '@emotion/styled';

import { Box } from '../Box';
import { IconComponentType } from '../Button/shared';
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
    // KENNY: REMOVE THIS LATER
    checking: {
      bg: 'feedback-success'
    }
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
    StyleProps<typeof sizeVariants> {}

const BadgeBase = styled('div', styledOptions)<BadgeBaseProps>(
  badgeProps,
  colorVariants,
  sizeVariants
);

export interface BadgeProps extends BadgeBaseProps, IconComponentType {}

export const Badge: React.FC<BadgeProps> = ({
  icon: Icon,
  children,
  ...rest
}) => {
  const iconSize = rest.size === 'sm' ? 'sm' : 'base';
  const size = determineIconSize(iconSize);
  const spacing = determineIconSpacing(iconSize);
  return (
    <BadgeBase {...rest}>
      {Icon && (
        <Box pr={spacing}>
          <Icon height={size} width={size} />
        </Box>
      )}
      {children}
    </BadgeBase>
  );
};
