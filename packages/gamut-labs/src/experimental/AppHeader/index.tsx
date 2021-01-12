import { AppBar, AppBarSection } from '@codecademy/gamut';
import React, { ReactElement } from 'react';

import { FillButton, TextButton } from '../../../../gamut/src/Button';
import { AppHeaderDropdown } from '../AppHeaderElements/AppHeaderDropdown';
import { AppHeaderLinkElement } from '../AppHeaderElements/AppHeaderLinkElement';
import { AppHeaderLogoElement } from '../AppHeaderElements/AppHeaderLogoElement';
import { AppHeaderTab } from '../AppHeaderElements/AppHeaderTab';
import { AppHeaderItem } from './types';

export type AppHeaderProps = {
  items: AppHeaderItemsProp;
  className?: string;
  onClick: (event: React.MouseEvent, trackingTarget: string) => void;
};

export type AppHeaderItemsProp = {
  left: AppHeaderItem[];
  right: AppHeaderItem[];
};

const mapItemToElement = (
  item: AppHeaderItem,
  onClick: (event: React.MouseEvent, trackingTarget: string) => void
): ReactElement => {
  switch (item.type) {
    case 'logo':
      return (
        <AppHeaderTab key={item.id}>
          <AppHeaderLogoElement item={item} onClick={onClick} />
        </AppHeaderTab>
      );
    case 'link':
      return (
        <AppHeaderTab key={item.id}>
          <AppHeaderLinkElement item={item} onClick={onClick} />
        </AppHeaderTab>
      );
    case 'text-button':
      return (
        <AppHeaderTab key={item.id}>
          <TextButton
            href={item.href}
            onClick={(event: React.MouseEvent) =>
              onClick(event, item.trackingTarget)
            }
            data-testid={item.dataTestId}
          >
            {item.text}
          </TextButton>
        </AppHeaderTab>
      );
    case 'fill-button':
      return (
        <AppHeaderTab key={item.id}>
          <FillButton
            href={item.href}
            data-testid={item.dataTestId}
            onClick={(event: React.MouseEvent) =>
              onClick(event, item.trackingTarget)
            }
          >
            {item.text}
          </FillButton>
        </AppHeaderTab>
      );
    case 'popover':
      return (
        <AppHeaderTab key={item.id}>
          <AppHeaderDropdown item={item} onClick={onClick} />
        </AppHeaderTab>
      );
    case 'render-popover':
      return <AppHeaderTab key={item.id}>{item.popover()}</AppHeaderTab>;
  }
};

export const AppHeader: React.FC<AppHeaderProps> = ({
  items,
  className = '',
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
