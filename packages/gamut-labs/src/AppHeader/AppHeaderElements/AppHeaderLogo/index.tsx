import { Anchor, Logo } from '@codecademy/gamut';
import React, { useEffect, useState } from 'react';

import { AppHeaderClickHandler, AppHeaderLogoItem } from '../types';

export type AppHeaderLogoProps = {
  action: AppHeaderClickHandler;
  item: AppHeaderLogoItem;
};

export const AppHeaderLogo: React.FC<AppHeaderLogoProps> = ({
  action,
  item,
}) => {
  const [windowWidth, setWindowWidth] = useState(0);

  const showMini = () => windowWidth <= 1260 && windowWidth >= 1200;

  useEffect(() => {
    // use non es6 func so doesn't share state with parent
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
        variant={showMini() ? 'mini' : item.pro ? 'pro' : 'default'}
        height={27}
        verticalAlign="text-bottom"
      />
    </Anchor>
  );
};
