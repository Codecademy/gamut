import { createContext, useContext } from 'react';

export interface MenuContextProps {
  spacing: 'normal' | 'condensed';
  variant: 'select' | 'navigation' | 'action';
  depth: number;
}

export const MenuContext = createContext<MenuContextProps>({
  spacing: 'normal',
  variant: 'select',
  depth: 0,
});

MenuContext.displayName = 'MenuContext';

export const MenuProvider = MenuContext.Provider;

export function useMenu({ spacing, variant }: Omit<MenuContextProps, 'depth'>) {
  const { depth, ...contextProps } = useContext(MenuContext);
  const root = depth === 0;
  const nextDepth = depth + 1;

  return {
    root,
    role: root ? 'menu' : 'group',
    variant: root ? variant : contextProps.variant,
    spacing: root ? spacing : contextProps.spacing,
    depth: nextDepth,
  } as const;
}

export function useMenuContext() {
  const context = useContext(MenuContext);

  return context;
}
