import {
  AppBar,
  AppBarSection,
  FillButton,
  TextButton,
} from '@codecademy/gamut';
import styled from '@emotion/styled';
import React, { ReactNode } from 'react';

import { AppHeaderDropdown } from './AppHeaderElements/AppHeaderDropdown';
import { AppHeaderLink } from './AppHeaderElements/AppHeaderLink';
import { AppHeaderLogo } from './AppHeaderElements/AppHeaderLogo';
import { AppHeaderTab } from './AppHeaderElements/AppHeaderTab';
import { focusStyles } from './AppHeaderElements/SharedStyles';
import {
  AppHeaderClickHandler,
  AppHeaderItem,
} from './AppHeaderElements/types';

export type AppHeaderProps = {
  action: AppHeaderClickHandler;
  className?: string;
  items: AppHeaderItemsProp;
};

export type AppHeaderItemsProp = {
  left: AppHeaderItem[];
  right: AppHeaderItem[];
};

const AppHeaderTextButton = styled(TextButton)(focusStyles);
const AppHeaderFillButton = styled(FillButton)(focusStyles);

const mapItemToElement = (
  action: AppHeaderClickHandler,
  item: AppHeaderItem
): ReactNode => {
  switch (item.type) {
    case 'logo':
      return (
        <AppHeaderTab key={item.id}>
          <AppHeaderLogo action={action} item={item} />
        </AppHeaderTab>
      );
    case 'link':
      return (
        <AppHeaderTab key={item.id}>
          <AppHeaderLink action={action} item={item} />
        </AppHeaderTab>
      );
    case 'dropdown':
    case 'profile-dropdown':
      return (
        <AppHeaderTab key={item.id}>
          <AppHeaderDropdown action={action} item={item} />
        </AppHeaderTab>
      );

    case 'render-element':
      return <AppHeaderTab key={item.id}>{item.renderElement()}</AppHeaderTab>;
    case 'text-button':
      return (
        <AppHeaderTab key={item.id}>
          <AppHeaderTextButton
            onClick={(event: React.MouseEvent) => action(event, item)}
            data-testid={item.dataTestId}
            href={item.href}
          >
            {item.text}
          </AppHeaderTextButton>
        </AppHeaderTab>
      );
    case 'fill-button':
      return (
        <AppHeaderTab key={item.id}>
          <AppHeaderFillButton
            data-testid={item.dataTestId}
            href={item.href}
            onClick={(event: React.MouseEvent) => action(event, item)}
          >
            {item.text}
          </AppHeaderFillButton>
        </AppHeaderTab>
      );
  }
};

export const AppHeader: React.FC<AppHeaderProps> = ({
  items,
  className,
  action,
}) => {
  return (
    <AppBar className={className}>
      <AppBarSection position="left">
        {items.left.map((item) => mapItemToElement(action, item))}
      </AppBarSection>
      <AppBarSection position="right">
        {items.right.map((item) => mapItemToElement(action, item))}
      </AppBarSection>
    </AppBar>
  );
};
