import {
  AppBar,
  AppBarSection,
  Box,
  FillButton,
  TextButton,
} from '@codecademy/gamut';
import styled from '@emotion/styled';
import React, { ReactNode, useCallback } from 'react';

import { formatUrlWithRedirect } from '../GlobalHeader/urlHelpers';
import { AppHeaderDropdown } from './AppHeaderElements/AppHeaderDropdown';
import { AppHeaderLink } from './AppHeaderElements/AppHeaderLink';
import { AppHeaderLogo } from './AppHeaderElements/AppHeaderLogo';
import { focusStyles } from './AppHeaderElements/SharedStyles';
import {
  AppHeaderClickHandler,
  AppHeaderItem,
  isAppHeaderItemWithHref,
} from './AppHeaderElements/types';
import { FormattedAppHeaderItems } from './types';

export type AppHeaderProps = {
  /** A method to be called on click/activating a header item */
  action: AppHeaderClickHandler;
  /** A method to be called only on click/activating a *link* header item */
  onLinkAction?: AppHeaderClickHandler;
  items: FormattedAppHeaderItems;
  redirectParam?: string;
};

export const StyledAppBar = styled(AppBar)`
  padding: 0.75rem 0;
  box-shadow: none;
  width: 100%;
`;

export const AppHeaderTextButton = styled(TextButton)(focusStyles);
export const AppHeaderFillButton = styled(FillButton)(focusStyles);

export const mapItemToElement = (
  action: AppHeaderClickHandler,
  item: AppHeaderItem,
  redirectParam?: string
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
        <AppHeaderTextButton
          onClick={(event: React.MouseEvent) => action(event, item)}
          data-testid={item.dataTestId}
          href={
            item.redirect
              ? formatUrlWithRedirect(item.href, redirectParam)
              : item.href
          }
        >
          {item.text}
        </AppHeaderTextButton>
      );
    case 'fill-button':
      return (
        <AppHeaderFillButton
          data-testid={item.dataTestId}
          href={
            item.redirect
              ? formatUrlWithRedirect(item.href, redirectParam)
              : item.href
          }
          onClick={(event: React.MouseEvent) => action(event, item)}
        >
          {item.text}
        </AppHeaderFillButton>
      );
  }
};

export const AppHeader: React.FC<AppHeaderProps> = ({
  action,
  onLinkAction,
  items,
  redirectParam,
}) => {
  const combinedAction = useCallback(
    (event: React.MouseEvent, item: AppHeaderItem) => {
      action(event, item);
      if (isAppHeaderItemWithHref(item)) onLinkAction?.(event, item);
    },
    [action, onLinkAction]
  );

  const mapItemsToElement = <T extends AppHeaderItem[]>(items: T) => {
    return items.map((item, index) => (
      <Box
        key={item.id}
        ml={index === 0 ? 0 : 8}
        mr={index === items.length - 1 ? 0 : 8}
      >
        {mapItemToElement(combinedAction, item, redirectParam)}
      </Box>
    ));
  };

  return (
    <StyledAppBar>
      <AppBarSection position="left">
        {mapItemsToElement(items.left)}
      </AppBarSection>
      <AppBarSection position="right">
        {mapItemsToElement(items.right)}
      </AppBarSection>
    </StyledAppBar>
  );
};
