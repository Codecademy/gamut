import React from 'react';

export interface MenuContextProps {
  condensed?: boolean;
  type?: 'select' | 'navigation' | 'action';
}

export const MenuContext = React.createContext<MenuContextProps>({
  condensed: false,
});

MenuContext.displayName = 'MenuContext';
