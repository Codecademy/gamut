import { createContext, useContext, useMemo } from 'react';

import { PrivateListProps } from './types';

export interface ListContextProps extends PrivateListProps {
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

export function useList({
  spacing,
  variant,
  scrollable,
  breakpoint = 'xs',
}: PrivateListProps) {
  const {
    depth = 0,
    variant: parentVariant,
    spacing: parentSpacing,
  } = useListContext();
  const activeVariant = variant ?? parentVariant;
  const activeSpacing = spacing ?? parentSpacing;

  return useMemo(
    () => ({
      root: depth === 0,
      scrollable,
      variant: activeVariant,
      spacing: activeSpacing,
      depth: depth + 1,
      breakpoint,
    }),
    [scrollable, activeVariant, activeSpacing, depth, breakpoint]
  );
}
