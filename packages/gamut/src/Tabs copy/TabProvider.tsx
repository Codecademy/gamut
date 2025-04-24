import { TabListState } from '@react-stately/tabs';
import { createContext, useContext, useMemo } from 'react';

type Item = {};
export interface TabContextProps {
  variant: 'standard' | 'block';
  state: TabListState<Item>;
}

export const TabContext = createContext<TabContextProps>({} as TabContextProps);

TabContext.displayName = 'TabContext';

export const TabProvider = TabContext.Provider;

export function useTabContext() {
  const context = useContext(TabContext);
  return context;
}

export function useTabShared() {
  const { variant, state } = useTabContext();

  return useMemo(
    () => ({
      variant,
      state,
    }),
    [variant, state]
  );
}
