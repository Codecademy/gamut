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
  topSeparator?: boolean;
};

export const AppHeaderLinkMobile: React.FC<AppHeaderLinkMobileProps> = ({
  action,
  item,
  topSeparator = false,
}) => {
  const Icon = item.icon;

  return (
    <>
      {topSeparator && (
        <Box width="100%" height="1px" backgroundColor="navy" marginY={8} />
      )}
      <HeaderLink
        width="100%"
        data-intellimize={item.dataIntellimizeId}
        data-testid={item.dataTestId}
        href={item.href}
        onClick={(event) => action(event, item)}
        target={item.newTab ? 'blank' : ''}
        variant="interface"
        paddingY={16}
        lineHeight="base"
        textAlign="left"
      >
        {Icon && (
          <Box display="flex" alignContent="center" marginRight={16}>
            <Icon size={24} aria-hidden />
          </Box>
        )}
        {item.text}
      </HeaderLink>
    </>
  );
};
