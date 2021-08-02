import { MenuItem } from '@codecademy/gamut';
import React from 'react';

import {
  AppHeaderClickHandler,
  AppHeaderLinkItem,
} from '../../AppHeader/AppHeaderElements/types';

export type AppHeaderLinkMobileProps = {
  item: AppHeaderLinkItem;
  action: AppHeaderClickHandler;
  topSeparator?: boolean;
};

export const AppHeaderLinkMobile: React.FC<AppHeaderLinkMobileProps> = ({
  action,
  item,
}) => {
  return (
    <MenuItem
      data-testid={item.dataTestId}
      href={item.href}
      icon={item.icon}
      onClick={(event) => action(event, item)}
      // target={item.newTab ? 'blank' : ''}
    >
      {item.text}
    </MenuItem>
  );
};
