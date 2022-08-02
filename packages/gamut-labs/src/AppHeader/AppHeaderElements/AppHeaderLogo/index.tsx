import { Anchor, Logo } from '@codecademy/gamut';
import React, { useState } from 'react';

import { RenderBookmarks } from '../../../GlobalHeader/types';
import { AppHeaderClickHandler, AppHeaderLogoItem } from '../types';

export type AppHeaderLogoProps = {
  action: AppHeaderClickHandler;
  item: AppHeaderLogoItem;
  renderBookmarks?: RenderBookmarks;
};

export const AppHeaderLogo: React.FC<AppHeaderLogoProps> = ({
  action,
  item,
  renderBookmarks,
}) => {
  const [windowWidth, setWindowWidth] = useState(0);

  if (typeof window !== undefined) {
    setWindowWidth(window.innerWidth || document.documentElement.clientWidth)
  }

  const showMiniLogo = renderBookmarks && (windowWidth <= 1260 && windowWidth >= 1200);

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
