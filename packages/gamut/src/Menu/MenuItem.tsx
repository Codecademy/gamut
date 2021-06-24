import React, { ComponentProps, MutableRefObject, useContext } from 'react';

import { ListItem, ListItemProps, ListLink, ListLinkProps } from './elements';
import { MenuContext } from './MenuContext';

const activePropnames = {
  navigation: 'active-navlink',
  action: 'active',
  select: 'selected',
};

export const MenuItem = React.forwardRef<
  HTMLLIElement | HTMLAnchorElement,
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
  } as ListItemProps;

  if (href) {
    const linkRef = ref as MutableRefObject<HTMLAnchorElement>;

    return (
      <ListItem role="none">
        <ListLink {...(computed as ListLinkProps)} href={href} ref={linkRef}>
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
