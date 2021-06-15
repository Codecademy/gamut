import React from 'react';

export interface MenuContextProps {
  spacing: 'normal' | 'condensed';
  variant: 'select' | 'navigation' | 'action';
  depth: number;
}

export const MenuContext = React.createContext<MenuContextProps>({
  spacing: 'normal',
  variant: 'select',
  depth: 0,
});

MenuContext.displayName = 'MenuContext';
