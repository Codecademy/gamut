import {
  AppBar,
  AppBarSection,
  FillButton,
  TextButton,
} from '@codecademy/gamut';
import styled from '@emotion/styled';
import React, { ReactNode } from 'react';

import { AppHeaderDropdown, AppHeaderLink, AppHeaderLogo } from '..';
import { AppHeaderTab } from './AppHeaderElements/AppHeaderTab';
import { focusStyles } from './AppHeaderElements/SharedStyles';
import {
  AppHeaderClickHandler,
  AppHeaderItem,
} from './AppHeaderElements/types';

export type AppHeaderProps = {
  items: AppHeaderItemsProp;
  className?: string;
  onClick: AppHeaderClickHandler;
};

export type AppHeaderItemsProp = {
  left: AppHeaderItem[];
  right: AppHeaderItem[];
};

const AppHeaderTextButton = styled(TextButton)(focusStyles);
const AppHeaderFillButton = styled(FillButton)(focusStyles);

const mapItemToElement = (
  item: AppHeaderItem,
  onClick: AppHeaderClickHandler
): ReactNode => {
  switch (item.type) {
    case 'logo':
      return (
        <AppHeaderTab key={item.id}>
          <AppHeaderLogo item={item} onClick={onClick} />
        </AppHeaderTab>
      );
    case 'link':
      return (
        <AppHeaderTab key={item.id}>
          <AppHeaderLink item={item} onClick={onClick} />
        </AppHeaderTab>
      );
    case 'dropdown':
      return (
        <AppHeaderTab key={item.id}>
          <AppHeaderDropdown item={item} onClick={onClick} />
        </AppHeaderTab>
      );
    case 'render-element':
      return <AppHeaderTab key={item.id}>{item.renderElement()}</AppHeaderTab>;
    case 'text-button':
      return (
        <AppHeaderTab key={item.id}>
          <AppHeaderTextButton
            data-testid={item.dataTestId}
            href={item.href}
            onClick={(event: React.MouseEvent) => onClick(event, item)}
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
            onClick={(event: React.MouseEvent) => onClick(event, item)}
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
  onClick,
}) => {
  return (
    <AppBar className={className}>
      <AppBarSection position="left">
        {items.left.map((item) => mapItemToElement(item, onClick))}
      </AppBarSection>
      <AppBarSection position="right">
        {items.right.map((item) => mapItemToElement(item, onClick))}
      </AppBarSection>
    </AppBar>
  );
};
