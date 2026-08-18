import { GamutIconProps } from '@codecademy/gamut-icons';
import isString from 'lodash/isString';
import {
  ComponentProps,
  forwardRef,
  MouseEventHandler,
  Ref,
  useId,
} from 'react';

import { FlexBox } from '../Box';
import { ToolTipProps } from '../Tip/ToolTip';
import { Text } from '../Typography';
import {
  MenuListButton,
  MenuListItem,
  MenuListItemProps,
  MenuListLink,
  MenuListLinkProps,
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
  ComponentProps<typeof MenuListItem>,
  'variant' | 'selected' | 'active-navlink' | 'children'
>;

type ToolTipLabel = string | Omit<ToolTipProps, 'id'>;

interface MenuItemIconOnly extends HTMLProps, ForwardListItemProps {
  icon: React.ComponentType<GamutIconProps>;
  children?: never;
  /** ToolTips will only render for interactive items, otherwise the label will be used as a generic aria-label  */
  label: ToolTipLabel;
  disabled?: boolean;
  closeOnClick?: boolean;
}

interface MenuTextItem extends HTMLProps, ForwardListItemProps {
  icon?: React.ComponentType<GamutIconProps>;
  children: React.ReactNode;
  label?: ToolTipLabel;
  disabled?: boolean;
  closeOnClick?: never;
}

type MenuItemTypes = MenuItemIconOnly | MenuTextItem;

type MenuItemRefElement = HTMLLIElement | HTMLAnchorElement | HTMLButtonElement;

/**
 * Narrows the forwarded ref union to a specific element type for the current render branch.
 * MenuItem renders exactly one of li, a, or button per call, so the ref is forwarded to that element.
 */
function narrowMenuItemRef<T extends MenuItemRefElement>(
  ref: React.Ref<MenuItemRefElement | null>
): Ref<T> {
  return ref as Ref<T>;
}

export const MenuItem = forwardRef<
  HTMLLIElement | HTMLAnchorElement | HTMLButtonElement,
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
      'aria-label': explicitAriaLabel,
      closeOnClick = true,
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
    } as MenuListItemProps;

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
      'aria-label': isIconOnly ? ariaLabel ?? explicitAriaLabel : undefined,
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
      return (
        <MenuListItem {...listItemProps}>
          <MenuToolTipWrapper label={label} tipId={tipId}>
            <MenuListLink
              {...(computed as MenuListLinkProps)}
              href={href}
              ref={narrowMenuItemRef<HTMLAnchorElement>(ref)}
              target={target}
            >
              {content}
            </MenuListLink>
          </MenuToolTipWrapper>
        </MenuListItem>
      );
    }

    if (listItemType === 'button' || (listItemType === 'link' && disabled)) {
      const handleClick: MouseEventHandler<HTMLButtonElement> = disabled
        ? () => null
        : (props.onClick as any as MouseEventHandler<HTMLButtonElement>);

      return (
        <MenuListItem {...listItemProps}>
          <MenuToolTipWrapper
            closeOnClick={closeOnClick}
            label={label}
            tipId={tipId}
          >
            <MenuListButton
              {...(computed as MenuListLinkProps)}
              ref={narrowMenuItemRef<HTMLButtonElement>(ref)}
              onClick={handleClick}
            >
              {content}
            </MenuListButton>
          </MenuToolTipWrapper>
        </MenuListItem>
      );
    }

    return (
      // These are non-interactive and will never have tooltips (nor should they).
      <MenuListItem
        {...(computed as MenuListItemProps)}
        ref={narrowMenuItemRef<HTMLLIElement>(ref)}
      >
        {content}
      </MenuListItem>
    );
  }
);
