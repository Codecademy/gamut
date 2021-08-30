import React, { createContext, FC, useMemo } from 'react';

import { componentRegistry } from './components';
import {
  ComponentContextShape,
  ComponentProviderProps,
  ProviderComponents,
} from './types';

export const ComponentContext = createContext<ComponentContextShape>(
  componentRegistry
);

export const ComponentProvider: FC<ComponentProviderProps> = ({
  overrides,
  children,
}) => {
  const contextValue = useMemo(
    () =>
      Object.keys(componentRegistry).reduce(
        (carry, key: ProviderComponents) => ({
          ...carry,
          [key]: {
            ...componentRegistry[key],
            ...overrides[key],
          },
        }),
        {} as ComponentContextShape
      ),
    [overrides]
  );

  return (
    <ComponentContext.Provider value={contextValue}>
      {children}
    </ComponentContext.Provider>
  );
};
