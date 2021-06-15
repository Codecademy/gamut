import { styledConfig, system } from '@codecademy/gamut-styles';
import { StyleProps, variance } from '@codecademy/variance';
import styled from '@emotion/styled';

import { ButtonBase } from '../ButtonBase/ButtonBase';
import { MenuContextProps } from './shared';

export interface MenuProps
  extends MenuContextProps,
    StyleProps<typeof menuProps> {}
export interface MenuItemProps extends StyleProps<typeof menuItemProps> {}

export interface MenuOptionProps extends MenuItemProps {
  active?: boolean;
}
export interface MenuLinkProps extends MenuOptionProps {
  navlink?: boolean;
}

enum Selectors {
  BEFORE = '&::before',
  HOVER = '&:hover',
  DISABLED = '&[disabled], &:disabled',
  FOCUS_VISIBLE = '&:focus-visible',
}

const menuItemProps = variance.compose(
  system.layout,
  system.typography,
  system.space
);

const menuProps = variance.compose(menuItemProps, system.positioning);

export const MenuListElement = styled('ul', styledConfig)<MenuProps>(
  system.css({
    display: 'inline-block',
    minWidth: 192,
    listStyle: 'none',
    bg: 'background',
    border: 1,
    m: 0,
    position: 'relative',
    zIndex: 1,
  }),
  menuProps
);

export const MenuItemElement = styled(
  'li',
  styledConfig
)<MenuItemProps>(menuItemProps);

const menuButtonStyles = system.css({
  width: 1,
  height: 1,
  position: 'relative',
  zIndex: 1,
  textAlign: 'inherit',
  px: 12,
  transition: 'background-color 150ms, color 150ms',
  [Selectors.DISABLED]: {
    pointerEvents: 'none',
  },
  [Selectors.BEFORE]: {
    content: '""',
    bg: 'inherit',
    zIndex: -1,
    position: 'absolute',
    inset: -12,
    top: 0,
    bottom: 0,
  },
});

export const MenuLink = styled(ButtonBase)<MenuLinkProps>(
  menuButtonStyles,
  system.css({
    px: 24,
    [Selectors.HOVER]: {
      textColor: 'primary',
    },
  }),
  system.states({
    navlink: {
      borderColor: 'transparent',
      [Selectors.BEFORE]: {
        top: 4,
        bottom: 4,
        borderWidthLeft: '6px',
        borderStyleLeft: 'solid',
        borderColorLeft: 'inherit',
      },
    },
    active: {
      fontWeight: 700,
      borderColorLeft: 'secondary',
    },
  }),
  menuItemProps
);

export const MenuOption = styled(ButtonBase)<MenuOptionProps>(
  menuButtonStyles,
  system.css({
    [Selectors.HOVER]: {
      bg: 'background-hover',
    },
    [Selectors.FOCUS_VISIBLE]: {
      bg: 'background-hover',
    },
  }),
  system.states({
    active: {
      bg: 'background-selected',
    },
  }),
  menuItemProps
);

export const MenuSeparatorElement = styled(
  'li',
  styledConfig
)(
  system.css({
    height: 8,
    width: 1,
    display: 'flex',
    alignItems: 'center',
    '&:after': {
      mx: 4,
      width: 1,
      content: '""',
      height: '1px',
      bg: 'text-disabled',
      borderRadius: '2px',
    },
  })
);
