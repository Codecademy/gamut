import {
  AppBar,
  AppBarSection,
  Box,
  FillButton,
  TextButton,
} from '@codecademy/gamut';
import styled from '@emotion/styled';
import React, { ReactNode } from 'react';

import { formatUrlWithRedirect } from '../GlobalHeader/urlHelpers';
import { HeaderHeightArea } from '../HeaderHeightArea';
import { NotificationsPopover } from '../Notifications/NotificationsPopover';
import { AppHeaderNotifications } from '../Notifications/types';
import { useHeaderNotifications } from '../Notifications/useHeaderNotifications';
import { AppHeaderDropdown } from './AppHeaderElements/AppHeaderDropdown';
import { AppHeaderLink } from './AppHeaderElements/AppHeaderLink';
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

export const StyledAppBar = styled(AppBar)`
  padding: 0.75rem 0;
  box-shadow: none;
  width: 100%;
`;

export const AppHeaderTextButton = styled(TextButton);
export const AppHeaderFillButton = styled(FillButton);

export const mapItemToElement = (
  action: AppHeaderClickHandler,
  item: AppHeaderItem,
  redirectParam?: string,
  mobile = false
): ReactNode => {
  switch (item.type) {
    case 'logo':
      return <AppHeaderLogo action={action} item={item} />;
    case 'link':
      return <AppHeaderLink action={action} item={item} />;
    case 'dropdown':
    case 'profile-dropdown':
      return <AppHeaderDropdown action={action} item={item} />;
    case 'render-element':
      return item.renderElement();
    case 'text-button':
      return (
        <TextButton
          size={mobile ? 'small' : 'normal'}
          onClick={(event: React.MouseEvent) => action(event, item)}
          data-testid={item.dataTestId}
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
  const mapItemsToElement = <T extends AppHeaderItem[]>(items: T) => {
    return items.map((item, index) => (
      <Box
        key={item.id}
        ml={index === 0 ? 0 : 8}
        mr={index === items.length - 1 ? 0 : 8}
      >
        {mapItemToElement(action, item, redirectParam)}
      </Box>
    ));
  };

  const [notificationsBell, notificationsView] = useHeaderNotifications(
    notifications,
    NotificationsPopover
  );
  const [searchButton, searchPane] = useHeaderSearch(search);

  const right = [
    searchButton,
    ...(notificationsBell ? [notificationsBell] : []),
    ...items.right,
  ];

  return (
    <HeaderHeightArea display={{ _: 'none', md: 'block' }}>
      <StyledAppBar>
        <AppBarSection position="left">
          {mapItemsToElement(items.left)}
        </AppBarSection>
        <AppBarSection position="right">
          {mapItemsToElement(right)}
        </AppBarSection>
      </StyledAppBar>
      {notificationsView}
      {searchPane}
    </HeaderHeightArea>
  );
};
