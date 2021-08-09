import { GamutIconProps } from '@codecademy/gamut-icons';
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
    icon?: React.ComponentType<GamutIconProps>;
  }
>(({ href, children, active, icon: Icon, ...props }, ref) => {
  const { variant, ...rest } = useMenuContext();
  const activeProp = activePropnames[variant];
  const computed = {
    ...props,
    ...rest,
    variant: variant === 'select' ? 'select' : 'link',
    role: 'menuitem',
    [activeProp]: active,
  } as ListItemProps;

  const content = (
    <>
      {Icon && (
        <Icon
          size={rest.spacing === 'condensed' ? 16 : 24}
          mr={12}
          data-testid="menuitem-icon"
        />
      )}
      {children}
    </>
  );

  if (href) {
    const linkRef = ref as MutableRefObject<HTMLAnchorElement>;

    return (
      <ListItem role="none">
        <ListLink {...(computed as ListLinkProps)} href={href} ref={linkRef}>
          {content}
        </ListLink>
      </ListItem>
    );
  }

  const liRef = ref as MutableRefObject<HTMLLIElement>;

  return (
    <ListItem {...computed} ref={liRef}>
      {content}
    </ListItem>
  );
});
