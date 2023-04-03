import { Anchor, Logo } from '@codecademy/gamut';
import { useEffect, useState } from 'react';
import * as React from 'react';

import { AppHeaderClickHandler, AppHeaderLogoItem } from '../types';

const getLogoVariant = (item: AppHeaderLogoItem, showMini: boolean) => {
  if (item.checkMini && showMini) return 'mini';
  if (item.enterprise) return 'enterprise';
  return item.pro ? 'pro' : 'default';
};

export type AppHeaderLogoProps = {
  action: AppHeaderClickHandler;
  item: AppHeaderLogoItem;
};

export const AppHeaderLogo: React.FC<AppHeaderLogoProps> = ({
  action,
  item,
}) => {
  const [showMini, setShowMini] = useState(false);

  useEffect(() => {
    if (!item.checkMini) {
      return;
    }
    const handleResize = () => {
      const shouldShowMini =
        window.innerWidth <= 1260 && window.innerWidth >= 1200;
      // avoid unnecessary setState actions if val doesnt change
      if (showMini !== shouldShowMini) {
        setShowMini(shouldShowMini);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, [item.checkMini, showMini]);

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
        variant={getLogoVariant(item, showMini)}
        height={item.enterprise ? 36 : 27}
        verticalAlign="text-bottom"
      />
    </Anchor>
  );
};
