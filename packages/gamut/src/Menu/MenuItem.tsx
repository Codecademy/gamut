import { GamutIconProps } from '@codecademy/gamut-icons';
import isString from 'lodash/isString';
import {
  ComponentProps,
  forwardRef,
  MouseEventHandler,
  MutableRefObject,
  useId,
} from 'react';

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
type ForwardListItemProps = Omit<
  ComponentProps<typeof ListItem>,
  'variant' | 'selected' | 'active-navlink' | 'children'
>;

type ToolTipLabel = string | Omit<ToolTipProps, 'id'>;

interface MenuItemIconOnly extends HTMLProps, ForwardListItemProps {
  icon: React.ComponentType<GamutIconProps>;
  children?: never;
  /** ToolTips will only render for interactive items, otherwise the label will be used as a generic aria-label  */
  label: ToolTipLabel;
  disabled?: boolean;
}

interface MenuTextItem extends HTMLProps, ForwardListItemProps {
  icon?: React.ComponentType<GamutIconProps>;
  children: React.ReactNode;
  label?: ToolTipLabel;
  disabled?: boolean;
}

type MenuItemTypes = MenuItemIconOnly | MenuTextItem;

export const MenuItem = forwardRef<
  HTMLLIElement | HTMLAnchorElement | HTMLButtonElement | null,
  MenuItemTypes
>(
  (
    {
      active,
      children,
      disabled,
      height = 1,
      href,
      icon: Icon,
      label,
      target,
      width = 1,
      ...props
    },
    ref
  ) => {
    const { variant, role, ...rest } = useMenuContext();
    const tipId = useId();
    const isIconOnly = !!Icon && !children;

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
      'aria-label': isIconOnly ? ariaLabel : undefined,
      'aria-describedby': !isIconOnly && ariaLabel ? tipId : undefined,
      'aria-disabled': disabled,
      isDisabled: disabled,
    };

    const content = (
      <>
        {Icon && (
          <FlexBox width="fit-content">
            <Icon
              data-testid="menuitem-icon"
              mr={children ? 12 : 0}
              size={rest.spacing === 'condensed' ? 16 : 24}
            />
          </FlexBox>
        )}
        {active && <Text screenreader>{currentItemText[listItemType]},</Text>}
        {children}
      </>
    );

    if (listItemType === 'link' && !disabled) {
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

    if (listItemType === 'button' || (listItemType === 'link' && disabled)) {
      const buttonRef = ref as MutableRefObject<HTMLButtonElement>;
      const handleClick: MouseEventHandler<HTMLButtonElement> = disabled
        ? () => null
        : (props.onClick as any as MouseEventHandler<HTMLButtonElement>);

      return (
        <ListItem {...listItemProps}>
          <MenuToolTipWrapper label={label} tipId={tipId}>
            <ListButton
              {...(computed as ListLinkProps)}
              ref={buttonRef}
              onClick={handleClick}
            >
              {content}
            </ListButton>
          </MenuToolTipWrapper>
        </ListItem>
      );
    }

    const liRef = ref as MutableRefObject<HTMLLIElement>;

    return (
      // These are non-interactive and will never have tooltips (nor should they).
      <ListItem {...(computed as ListItemProps)} ref={liRef}>
        {content}
      </ListItem>
    );
  }
);
