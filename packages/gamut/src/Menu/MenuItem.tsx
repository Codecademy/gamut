import { GamutIconProps, MultipleUsersIcon } from '@codecademy/gamut-icons';
import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { isObject, isString } from 'lodash';
import {
  ComponentProps,
  forwardRef,
  Fragment,
  MutableRefObject,
  useId,
} from 'react';

import { ToolTip, ToolTipProps } from '../Tip/ToolTip';
import { Text } from '../Typography';
import {
  ListButton,
  ListItem,
  ListItemProps,
  ListLink,
  ListLinkProps,
} from './elements';
import { useMenuContext } from './MenuContext';
import { MenuSeparator } from './MenuSeparator';

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
  label: ToolTipLabel;
}

interface MenuNotItemIconOnly extends HTMLProps, KeepThisHere {
  icon?: React.ComponentType<GamutIconProps>;
  children: React.ReactNode;
  label?: ToolTipLabel;
}

type newType = MenuItemIconOnly | MenuNotItemIconOnly;

// TODO - Move wrapper into a separate component
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

    const Wrapper = label ? ToolTip : Fragment;
    const wrapperProps =
      label && isString(label)
        ? ({
            info: label,
            placement: 'floating',
            id: tipId,
            inheritDims: true,
          } as const)
        : isObject(label)
        ? { ...label, id: tipId }
        : {};

    const listItemProps = {
      role: listItemRole,
      height,
      width,
    } as ListItemProps;
    const computed = {
      ...props,
      height,
      width,
      ...rest,
      variant: 'link',
      role: role === 'menu' ? 'menuitem' : undefined,
      [activeProp]: active,
      'aria-describedby': label ? tipId : undefined,
    };

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
        <ListItem {...listItemProps}>
          <Wrapper {...wrapperProps}>
            <ListLink
              {...(computed as ListLinkProps)}
              href={href}
              ref={linkRef}
              target={target}
            >
              {content}
            </ListLink>
          </Wrapper>
        </ListItem>
      );
    }

    if (listItemType === 'button') {
      const buttonRef = ref as MutableRefObject<HTMLButtonElement>;

      return (
        <ListItem {...listItemProps}>
          <Wrapper {...wrapperProps}>
            <ListButton {...(computed as ListLinkProps)} ref={buttonRef}>
              {content}
            </ListButton>
          </Wrapper>
        </ListItem>
      );
    }

    const liRef = ref as MutableRefObject<HTMLLIElement>;

    const combinedProps = { ...computed, ...listItemProps } as ListItemProps;
    return (
      <ListItem {...combinedProps} ref={liRef}>
        {content}
      </ListItem>
    );
  }
);

export const IconOnly = () => {
  return (
    <>
      <MenuItem icon={MultipleUsersIcon} label="oy" />
      <MenuItem icon={MultipleUsersIcon}> oy</MenuItem>
      <MenuSeparator my={4} />
      <MenuItem icon={MultipleUsersIcon} label=":)" />
      <MenuItem
        icon={MultipleUsersIcon}
        label={{
          info: 'hej',
          placement: 'inline',
          narrow: true,
          alignment: 'bottom-center',
        }}
      />
    </>
  );
};
