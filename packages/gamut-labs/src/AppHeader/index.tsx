import { AppBar, FillButton, TextButton } from '@codecademy/gamut';
import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react';

import { formatUrlWithRedirect } from '../GlobalHeader/urlHelpers';
import { HeaderHeightArea } from '../HeaderHeightArea';
import { NotificationsPopover } from '../Notifications/NotificationsPopover';
import { AppHeaderNotifications } from '../Notifications/types';
import { useHeaderNotifications } from '../Notifications/useHeaderNotifications';
import { AppHeaderDropdown } from './AppHeaderElements/AppHeaderDropdown';
import { AppHeaderLink } from './AppHeaderElements/AppHeaderLink';
import { AppHeaderListItem } from './AppHeaderElements/AppHeaderListItem';
import { AppHeaderLogo } from './AppHeaderElements/AppHeaderLogo';
import {
  AppHeaderClickHandler,
  AppHeaderItem,
} from './AppHeaderElements/types';
import { AppHeaderSearch, useHeaderSearch } from './Search/useHeaderSearch';
import { FormattedAppHeaderItems } from './types';

export type AppHeaderProps = {
  action: AppHeaderClickHandler;
  items: FormattedAppHeaderItems;
  notifications?: AppHeaderNotifications;
  redirectParam?: string;
  search: AppHeaderSearch;
};

export const StyledAppBar = styled(AppBar)(
  css({
    padding: `0.75rem 0`,
    boxShadow: `none`,
    width: `100%`,
  })
);

export const StyledMenuBar = styled.ul(
  css({
    display: `flex`,
    padding: 0,
    listStyle: `none`,
    margin: 0,
    width: `100%`,
  })
);

const KEY_CODES = {
  UP: 'ArrowUp',
  DOWN: 'ArrowDown',
  LEFT: 'ArrowLeft',
  RIGHT: 'ArrowRight',
  END: 'End',
  HOME: 'Home',
} as const;

export const mapItemToElement = (
  action: AppHeaderClickHandler,
  item: AppHeaderItem,
  redirectParam?: string,
  onKeyDown?: (event: React.KeyboardEvent) => void,
  mobile = false
): ReactNode => {
  switch (item.type) {
    case 'logo':
      return <AppHeaderLogo action={action} item={item} />;
    case 'link':
      return <AppHeaderLink tabIndex="-1" mx={0} action={action} item={item} />;
    case 'dropdown':
    case 'profile-dropdown':
      return (
        <AppHeaderDropdown onKeyDown={onKeyDown} action={action} item={item} />
      );
    case 'render-element':
      return item.renderElement();
    case 'text-button':
      return (
        <TextButton
          size={mobile ? 'small' : 'normal'}
          onClick={(event: React.MouseEvent) => action(event, item)}
          data-testid={item.dataTestId}
          tabIndex="-1"
          role="menuitem"
          href={
            item.redirect
              ? formatUrlWithRedirect(item.href, redirectParam)
              : item.href
          }
        >
          {item.text}
        </TextButton>
      );
    case 'fill-button':
      return (
        <FillButton
          size={mobile ? 'small' : 'normal'}
          data-testid={item.dataTestId}
          href={
            item.redirect
              ? formatUrlWithRedirect(item.href, redirectParam)
              : item.href
          }
          role="menuitem"
          tabIndex="-1"
          onClick={(event: React.MouseEvent) => action(event, item)}
        >
          {item.text}
        </FillButton>
      );
  }
};

export const AppHeader: React.FC<AppHeaderProps> = ({
  action,
  items,
  notifications,
  redirectParam,
  search,
}) => {
  const menuContainerRef = useRef<HTMLUListElement>(null);

  const [notificationsBell, notificationsView] = useHeaderNotifications(
    notifications,
    NotificationsPopover
  );
  const [searchButton, searchPane] = useHeaderSearch(search);

  const right = useMemo(
    () => [
      searchButton,
      ...(notificationsBell ? [notificationsBell] : []),
      ...items.right,
    ],
    [searchButton, notificationsBell, items]
  );

  const itemsCount = [...items.left, ...right].length - 1;

  const [focusIndex, setFocusIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [isContainerFocused, setIsContainerFocused] = useState(false);

  const focusFirstItem = () => setFocusIndex(0);
  const focusLastItem = () => setFocusIndex(itemsCount);

  const focusNextItem = () => {
    if (focusIndex === itemsCount) {
      focusFirstItem();
    } else {
      setFocusIndex(focusIndex + 1);
    }
  };

  const focusPreviousItem = () => {
    if (focusIndex === 0) {
      focusLastItem();
    } else {
      setFocusIndex(focusIndex - 1);
    }
  };

  const getNode = (index: number) => {
    return menuContainerRef?.current?.childNodes[index]
      .childNodes[0] as HTMLElement;
  };

  const menuHandleKeyEvents = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case KEY_CODES.HOME:
        focusFirstItem();
        break;
      case KEY_CODES.END:
        focusLastItem();
        break;
      case KEY_CODES.RIGHT:
        focusNextItem();
        break;
      case KEY_CODES.LEFT:
        focusPreviousItem();
        break;
      case KEY_CODES.UP:
      case KEY_CODES.DOWN:
        event.preventDefault();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const firstNode = getNode(0);
    const nextNode = getNode(focusIndex);

    if (firstNode && nextNode) {
      if (isContainerFocused) {
        if (focusIndex >= 0 && focusIndex <= itemsCount) {
          nextNode.focus();
        } else {
          firstNode.focus();
        }
      }

      if (!isFocused && !isContainerFocused) {
        if (focusIndex !== 0) {
          focusFirstItem();
          firstNode.focus();
          firstNode.blur();
        }
      }
    }
  }, [focusIndex, isContainerFocused, isFocused, itemsCount]);

  const mapItemsToElement = <T extends AppHeaderItem[]>(
    items: T,
    side: 'left' | 'right'
  ) => {
    return items.map((item, index) => (
      <AppHeaderListItem
        key={item.id}
        mr={8}
        ml={side === 'right' && index === 0 ? 'auto' : 8}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      >
        {mapItemToElement(action, item, redirectParam)}
      </AppHeaderListItem>
    ));
  };

  return (
    <HeaderHeightArea
      display={{ _: 'none', md: 'block' }}
      as="nav"
      title="Main Navigation"
    >
      <StyledAppBar>
        <StyledMenuBar
          role="menubar"
          ref={menuContainerRef}
          onKeyDown={menuHandleKeyEvents}
          onFocus={() => setIsContainerFocused(true)}
          onBlur={() => setIsContainerFocused(false)}
        >
          {mapItemsToElement(items.left, 'left')}
          {mapItemsToElement(right, 'right')}
        </StyledMenuBar>
      </StyledAppBar>
      {notificationsView}
      {searchPane}
    </HeaderHeightArea>
  );
};
