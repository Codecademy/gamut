import { createContext, useContext } from 'react';

import { ListProps } from '../List';

export interface MenuContextProps {
  spacing: 'normal' | 'condensed';
  variant: 'select' | 'navigation' | 'action';
  depth: number;
  role: ListProps['role'];
}

export const MenuContext = createContext<MenuContextProps>({
  spacing: 'normal',
  variant: 'select',
  depth: 0,
  role: undefined,
});

MenuContext.displayName = 'MenuContext';

export const MenuProvider = MenuContext.Provider;

type TrueContextPropsUtil = Omit<MenuContextProps, 'depth'>;
const getTrueProps = ({
  root,
  role,
  spacing,
  variant,
  contextProps,
}: {
  root: boolean;
  contextProps: TrueContextPropsUtil;
} & TrueContextPropsUtil) => {
  if (root) return { role, variant, spacing };

  const {
    role: contextRole,
    spacing: contextSpacing,
    variant: contextVariant,
  } = contextProps;

  return {
    role: contextRole,
    spacing: contextSpacing,
    variant: contextVariant,
  };
};

export function useMenu({
  role: roleProp,
  spacing: spacingProp,
  variant: variantProp,
}: Omit<MenuContextProps, 'depth'>) {
  const { depth, ...contextProps } = useContext(MenuContext);
  const root = depth === 0;
  const nextDepth = depth + 1;
  const { role, spacing, variant } = getTrueProps({
    root,
    role: roleProp,
    spacing: spacingProp,
    variant: variantProp,
    contextProps,
  });

  return {
    root,
    role: root ? role : role === 'menu' ? 'group' : undefined,
    variant,
    spacing,
    depth: nextDepth,
  } as const;
}

export function useMenuContext() {
  const context = useContext(MenuContext);

  return context;
}
