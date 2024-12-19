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
  listType,
  rowBreakpoint,
  scrollable,
  spacing,
  variant,
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
      depth: depth + 1,
      listType,
      root: depth === 0,
      rowBreakpoint,
      scrollable,
      spacing: activeSpacing,
      variant: activeVariant,
    }),
    [listType, scrollable, activeVariant, activeSpacing, depth, rowBreakpoint]
  );
}
