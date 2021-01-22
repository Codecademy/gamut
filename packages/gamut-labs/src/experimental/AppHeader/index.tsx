import { AppBar, AppBarSection } from '@codecademy/gamut';
import React, { ReactElement } from 'react';

import { FillButton, TextButton } from '../../../../gamut/src/Button';
import { AppHeaderDropdown, AppHeaderLink, AppHeaderLogo } from '..';
import { AppHeaderTab } from './AppHeaderElements/AppHeaderTab';
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

const mapItemToElement = (
  item: AppHeaderItem,
  onClick: AppHeaderClickHandler
): ReactElement => {
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
          <TextButton
            data-testid={item.dataTestId}
            href={item.href}
            onClick={(event: React.MouseEvent) => onClick(event, item)}
          >
            {item.text}
          </TextButton>
        </AppHeaderTab>
      );
    case 'fill-button':
      return (
        <AppHeaderTab key={item.id}>
          <FillButton
            data-testid={item.dataTestId}
            href={item.href}
            onClick={(event: React.MouseEvent) => onClick(event, item)}
          >
            {item.text}
          </FillButton>
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
