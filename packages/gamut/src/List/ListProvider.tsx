import { createContext, useContext, useMemo } from 'react';

import { ListProps } from './types';

export interface ListContextProps extends ListProps {
  depth: number;
}

export const ListContext = createContext<ListContextProps>(
  {} as ListContextProps
);

ListContext.displayName = 'ListContext';

export const ListProvider = ListContext.Provider;

export function useListContext() {
  const context = useContext(ListContext);
  return context;
}

export function useList({ spacing, variant }: ListProps) {
  const {
    depth = 0,
    variant: activeVariant = variant,
    spacing: activeSpacing = spacing,
  } = useListContext();

  return useMemo(
    () => ({
      root: depth === 0,
      variant: activeVariant,
      spacing: activeSpacing,
      depth: depth + 1,
    }),
    [activeVariant, activeSpacing, depth]
  );
}
