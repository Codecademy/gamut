import React, { ComponentProps, MutableRefObject, useContext } from 'react';

import { Box, FlexBox } from '../Box';
import { FlexBoxProps } from '../Box/props';
import { List, ListItem, ListLink, ListProps } from './elements';
import { MenuContext } from './shared';

const heirarchyProps = {
  parent: {
    parent: true,
    role: 'menu',
  },
  child: {
    role: 'group',
  },
};

export const Menu = React.forwardRef<
  HTMLUListElement | HTMLOListElement,
  ListProps
>(({ children, variant = 'select', spacing = 'normal', ...rest }, ref) => {
  const { depth, ...parentProps } = useContext(MenuContext);
  const isRoot = depth === 0;
  const heirachy = isRoot ? 'parent' : 'child';
  const nextDepth = depth + 1;

  const props = heirarchyProps[heirachy] as ListProps;

  return (
    <List {...rest} {...props} ref={ref}>
      <MenuContext.Provider
        value={{
          variant: isRoot ? variant : parentProps.variant,
          spacing: isRoot ? spacing : parentProps.spacing,
          depth: nextDepth,
        }}
      >
        {children}
      </MenuContext.Provider>
    </List>
  );
});

const activePropnames = {
  navigation: 'active-navlink',
  action: 'active',
  select: 'selected',
};

export const MenuItem = React.forwardRef<
  HTMLLIElement | HTMLButtonElement | HTMLAnchorElement,
  ComponentProps<typeof ListItem> & { href?: string }
>(({ href, children, active, ...props }, ref) => {
  const { variant, ...rest } = useContext(MenuContext);
  const activeProp = activePropnames[variant];
  const computed = {
    itemType: variant === 'select' ? 'select' : 'link',
    role: 'menuitem',
    [activeProp]: active,
    ...props,
    ...rest,
  } as const;

  if (href) {
    const buttonRef = ref as MutableRefObject<
      HTMLButtonElement | HTMLAnchorElement | null
    >;

    return (
      <ListItem role="none">
        <ListLink {...computed} href={href} ref={buttonRef}>
          {children}
        </ListLink>
      </ListItem>
    );
  }

  const liRef = ref as MutableRefObject<HTMLLIElement>;

  return (
    <ListItem {...computed} ref={liRef}>
      {children}
    </ListItem>
  );
});

interface MenuSeperatorProps extends FlexBoxProps {
  children?: never;
}

export const MenuSeparator: React.FC<MenuSeperatorProps> = (props) => {
  const { variant } = useContext(MenuContext);
  if (variant !== 'action') return null;

  return (
    <FlexBox as="li" role="separator" height={8} fit center {...props}>
      <Box fit height="1px" bg="text-disabled" borderRadius="2px" mx={16} />
    </FlexBox>
  );
};
