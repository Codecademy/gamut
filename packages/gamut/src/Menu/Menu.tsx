import React, { ComponentProps, useContext } from 'react';

import {
  MenuItemElement,
  MenuLink,
  MenuListElement,
  MenuOption,
  MenuProps,
  MenuSeparatorElement,
} from './element';
import { MenuContext } from './shared';

export const Menu = React.forwardRef<
  HTMLUListElement | HTMLOListElement,
  MenuProps
>(({ children, type, condensed = false, ...rest }, ref) => {
  const styleProps = {
    p: type === 'action' ? 12 : 0,
    ...rest,
  } as const;

  return (
    <MenuListElement {...styleProps} {...rest} ref={ref}>
      <MenuContext.Provider value={{ type, condensed }}>
        {children}
      </MenuContext.Provider>
    </MenuListElement>
  );
});

export const MenuItem = React.forwardRef<
  HTMLLIElement,
  ComponentProps<typeof MenuItemElement>
>((props, ref) => {
  const { condensed, type } = useContext(MenuContext);

  const computed = {
    px: type === 'action' ? 0 : 12,
    height: condensed ? 32 : 48,
  } as const;

  return <MenuItemElement width={1} {...computed} {...props} ref={ref} />;
});

export const MenuButton = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ComponentProps<typeof MenuLink>
>(({ active, disabled, ...props }, ref) => {
  const { type } = useContext(MenuContext);

  if (type === 'select') {
    return (
      <MenuOption disabled={active || disabled} active={active} {...props} />
    );
  }

  return (
    <MenuLink
      disabled={active || disabled}
      active={active}
      {...props}
      ref={ref}
    />
  );
});
export const MenuSeparator: React.FC<{ children?: never }> = () => {
  const { type } = useContext(MenuContext);
  if (type !== 'action') return null;

  return <MenuSeparatorElement role="separator" />;
};
