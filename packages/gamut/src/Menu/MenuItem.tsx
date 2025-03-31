import { GamutIconProps } from '@codecademy/gamut-icons';
import isString from 'lodash/isString';
import { ComponentProps, forwardRef, MutableRefObject, useId } from 'react';

import { FlexBox } from '../Box';
import { ToolTipProps } from '../Tip/ToolTip';
import { Text } from '../Typography';
import {
  ListButton,
  ListItem,
  ListItemProps,
  ListLink,
  ListLinkProps,
  MenuToolTipWrapper,
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

type HTMLProps = Partial<Pick<HTMLAnchorElement, 'href' | 'target' | 'rel'>>;
type KeepThisHere = Omit<
  ComponentProps<typeof ListItem>,
  'variant' | 'selected' | 'active-navlink' | 'children'
>;

type ToolTipLabel = string | Omit<ToolTipProps, 'id'>;

interface MenuItemIconOnly extends HTMLProps, KeepThisHere {
  icon: React.ComponentType<GamutIconProps>;
  children?: never;
  /** ToolTips will only render for interactive items, otherwise the label will be used as a generic aria-label  */
  label: ToolTipLabel;
}

interface MenuNotItemIconOnly extends HTMLProps, KeepThisHere {
  icon?: React.ComponentType<GamutIconProps>;
  children: React.ReactNode;
  label?: ToolTipLabel;
}

type newType = MenuItemIconOnly | MenuNotItemIconOnly;

export const MenuItem = forwardRef<
  HTMLLIElement | HTMLAnchorElement | HTMLButtonElement,
  newType
>(
  (
    {
      href,
      target,
      children,
      active,
      icon: Icon,
      label,
      height = 1,
      width = 1,
      ...props
    },
    ref
  ) => {
    const { variant, role, ...rest } = useMenuContext();
    const tipId = useId();

    const activeProp = activePropnames[variant];

    const listItemType = getListItemType(!!href, !!props.onClick);
    const listItemRole = role === 'menu' ? 'none' : undefined;

    const listItemProps = {
      role: listItemRole,
      height,
      width,
    } as ListItemProps;

    const ariaLabel = label
      ? typeof label === 'string'
        ? label
        : isString(label?.info)
        ? label.info
        : undefined
      : undefined;

    const computed = {
      ...props,
      height,
      width,
      ...rest,
      variant: 'link',
      role: role === 'menu' ? 'menuitem' : undefined,
      [activeProp]: active,
      'aria-label': ariaLabel,
    };

    const content = (
      <>
        {Icon && (
          <FlexBox width="fit-content">
            <Icon
              size={rest.spacing === 'condensed' ? 16 : 24}
              mr={children ? 12 : 0}
              data-testid="menuitem-icon"
            />
          </FlexBox>
        )}
        {active && <Text screenreader>{currentItemText[listItemType]},</Text>}
        {children}
      </>
    );

    if (listItemType === 'link') {
      const linkRef = ref as MutableRefObject<HTMLAnchorElement>;

      return (
        <ListItem {...listItemProps}>
          <MenuToolTipWrapper label={label} tipId={tipId}>
            <ListLink
              {...(computed as ListLinkProps)}
              href={href}
              ref={linkRef}
              target={target}
            >
              {content}
            </ListLink>
          </MenuToolTipWrapper>
        </ListItem>
      );
    }

    if (listItemType === 'button') {
      const buttonRef = ref as MutableRefObject<HTMLButtonElement>;

      return (
        <ListItem {...listItemProps}>
          <MenuToolTipWrapper label={label} tipId={tipId}>
            <ListButton {...(computed as ListLinkProps)} ref={buttonRef}>
              {content}
            </ListButton>
          </MenuToolTipWrapper>
        </ListItem>
      );
    }

    const liRef = ref as MutableRefObject<HTMLLIElement>;

    return (
      // There are non-interactive and should never have tooltips
      <ListItem {...(computed as ListItemProps)} ref={liRef}>
        {content}
      </ListItem>
    );
  }
);

// Uncomment to test
//
// export const IconOnly = () => {
//   return (
//     <>
//       <MenuItem icon={MultipleUsersIcon} label="oy" />
//       <MenuItem> oy</MenuItem>
//       <MenuSeparator my={4} />
//       <MenuItem icon={MultipleUsersIcon} label=":)" />
//       <MenuItem
//         icon={MultipleUsersIcon}
//         label={{
//           info: 'hej',
//           placement: 'inline',
//           narrow: true,
//           alignment: 'bottom-center',
//         }}
//       />
//     </>
//   );
// };
