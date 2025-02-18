import * as React from 'react';
import { useRef } from 'react';

import { StyledAppBar, StyledNavBar } from './elements';
import { HeaderHeightArea } from './HeaderHeightArea';
import { HeaderProvider } from './HeaderProvider';
import { headerMobileBreakpoint } from './styles';
import { HeaderProps } from './types';
import { mapFloatingItemsToElement, mapItemsToElement } from './utilities';

export const Header: React.FC<HeaderProps> = ({ floatingItems, items }) => {
  const menuContainerRef = useRef<HTMLUListElement>(null);

  return (
    <HeaderHeightArea
      display={{ _: 'none', [headerMobileBreakpoint]: 'block' }}
    >
      <HeaderProvider>
        <StyledAppBar aria-label="Main" as="nav">
          <StyledNavBar ref={menuContainerRef}>
            {mapItemsToElement(items.left, 'left')}
            {mapItemsToElement(items.right, 'right')}
          </StyledNavBar>
        </StyledAppBar>
        {mapFloatingItemsToElement(floatingItems)}
      </HeaderProvider>
    </HeaderHeightArea>
  );
};
