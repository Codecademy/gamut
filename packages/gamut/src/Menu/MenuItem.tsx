import { GamutIconProps } from '@codecademy/gamut-icons';
import { ComponentProps, forwardRef, MutableRefObject } from 'react';

import { Text } from '../Typography';
import {
  ListButton,
  ListItem,
  ListItemProps,
  ListLink,
  ListLinkProps,
} from './elements';
import { useMenuContext } from './MenuContext';

const getListItemType = (href: boolean, onClick: boolean) =>
  href ? 'link' : onClick ? 'button' : 'item';

const activePropnames = {
  fixed: 'active-navlink',
  popover: 'active',
};

const currentItemText = {
  link: 'current page',
  button: 'current action',
  item: 'current item',
};

export const MenuItem = forwardRef<
  HTMLLIElement | HTMLAnchorElement | HTMLButtonElement,
  Omit<
    ComponentProps<typeof ListItem>,
    'variant' | 'selected' | 'active-navlink'
  > &
    Partial<Pick<HTMLAnchorElement, 'href' | 'target' | 'rel'>> & {
      icon?: React.ComponentType<GamutIconProps>;
    }
>(({ href, target, children, active, icon: Icon, ...props }, ref) => {
  const { variant, role, ...rest } = useMenuContext();
  const activeProp = activePropnames[variant];
  const computed = {
    ...props,
    ...rest,
    variant: 'link',
    role: role === 'menu' ? 'menuitem' : undefined,
    [activeProp]: active,
  } as ListItemProps;

  const listItemType = getListItemType(!!href, !!props.onClick);
  const listItemRole = role === 'menu' ? 'none' : undefined;

  const content = (
    <>
      {Icon && (
        <Icon
          size={rest.spacing === 'condensed' ? 16 : 24}
          mr={12}
          data-testid="menuitem-icon"
        />
      )}
      {active && <Text screenreader>{currentItemText[listItemType]},</Text>}
      {children}
    </>
  );

  if (listItemType === 'link') {
    const linkRef = ref as MutableRefObject<HTMLAnchorElement>;

    return (
      <ListItem role={listItemRole}>
        <ListLink
          {...(computed as ListLinkProps)}
          href={href}
          ref={linkRef}
          target={target}
        >
          {content}
        </ListLink>
      </ListItem>
    );
  }

  if (listItemType === 'button') {
    const buttonRef = ref as MutableRefObject<HTMLButtonElement>;

    return (
      <ListItem role={listItemRole}>
        <ListButton {...(computed as ListLinkProps)} ref={buttonRef}>
          {content}
        </ListButton>
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
