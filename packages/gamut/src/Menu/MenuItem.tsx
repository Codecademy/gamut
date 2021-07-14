import React, { ComponentProps, MutableRefObject } from 'react';

import { ListItem, ListItemProps, ListLink, ListLinkProps } from './elements';
import { useMenuContext } from './MenuContext';

const activePropnames = {
  navigation: 'active-navlink',
  action: 'active',
  select: 'selected',
};

export const MenuItem = React.forwardRef<
  HTMLLIElement | HTMLAnchorElement,
  Omit<
    ComponentProps<typeof ListItem>,
    'variant' | 'selected' | 'active-navlink'
  > & {
    href?: string;
  }
>(({ href, children, active, ...props }, ref) => {
  const { variant, ...rest } = useMenuContext();
  const activeProp = activePropnames[variant];
  const computed = {
    ...props,
    ...rest,
    variant: variant === 'select' ? 'select' : 'link',
    role: 'menuitem',
    [activeProp]: active,
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
