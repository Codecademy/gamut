import { AppBarButton, FlexBox } from '@codecademy/gamut';
import React from 'react';

import {
  AppHeaderClickHandler,
  AppHeaderLinkItem,
} from '../../AppHeader/AppHeaderElements/types';

export type AppHeaderLinkMobileProps = {
  item: AppHeaderLinkItem;
  action: AppHeaderClickHandler;
};

export const AppHeaderLinkMobile: React.FC<AppHeaderLinkMobileProps> = ({
  action,
  item,
}) => {
  const Icon = item.icon;

  return (
    <AppBarButton
      width="100%"
      paddingY={12}
      data-intellimize={item.dataIntellimizeId}
      data-testid={item.dataTestId}
      href={item.href}
      onClick={(event) => action(event, item)}
      target={item.newTab ? 'blank' : ''}
    >
      {Icon && (
        <FlexBox alignItems="center" marginRight={16}>
          <Icon size={24} aria-hidden />
        </FlexBox>
      )}
      {item.text}
    </AppBarButton>
  );
};
