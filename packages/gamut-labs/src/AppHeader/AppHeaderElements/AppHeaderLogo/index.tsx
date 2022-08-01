import { Anchor, Logo } from '@codecademy/gamut';
import React from 'react';

import { AppHeaderClickHandler, AppHeaderLogoItem } from '../types';

export type AppHeaderLogoProps = {
  action: AppHeaderClickHandler;
  item: AppHeaderLogoItem;
};

export const AppHeaderLogo: React.FC<AppHeaderLogoProps> = ({
  action,
  item,
}) => {
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;
  const showMiniLogo = windowWidth <= 1260 && windowWidth >= 1200;

  return (
    <Anchor
      variant="interface"
      data-testid={item.dataTestId}
      py={4}
      onClick={(event) => action(event, item)}
      href={item.href}
      tabIndex="0"
      role="menuitem"
    >
      <Logo
        color="currentColor"
        variant={item.pro ? 'pro' : showMiniLogo ? 'mini' : 'default'}
        height={27}
        verticalAlign="text-bottom"
      />
    </Anchor>
  );
};
