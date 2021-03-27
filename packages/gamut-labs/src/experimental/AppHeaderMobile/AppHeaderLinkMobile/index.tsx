import { Box } from '@codecademy/gamut';
import React from 'react';

import { HeaderLink } from '../../AppHeader/AppHeaderElements/AppHeaderLink';
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
    <HeaderLink
      width="100%"
      data-intellimize={item.dataIntellimizeId}
      data-testid={item.dataTestId}
      href={item.href}
      onClick={(event) => action(event, item)}
      target={item.newTab ? 'blank' : ''}
      paddingY={{ base: 8, md: 16 }}
      marginY={{ base: 8, md: 0 }}
    >
      {Icon && (
        <Box marginRight={16}>
          <Icon size={24} aria-hidden />
        </Box>
      )}
      {item.text}
    </HeaderLink>
  );
};
