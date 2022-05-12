import { createContext, useContext, useMemo } from 'react';

export interface TabContextProps {
  variant: 'standard' | 'block';
}

export const TabContext = createContext<TabContextProps>({} as TabContextProps);

TabContext.displayName = 'TabContext';

export const TabProvider = TabContext.Provider;

export function useTabContext() {
  const context = useContext(TabContext);
  return context;
}

export function useTab() {
  const { variant } = useTabContext();

  return useMemo(
    () => ({
      variant,
    }),
    [variant]
  );
}
