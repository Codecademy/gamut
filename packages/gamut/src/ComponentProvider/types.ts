import { ComponentType } from 'react';

import { componentRegistry } from './components';

export type ComponentRegistry = typeof componentRegistry;

export type ProviderComponents = keyof ComponentRegistry;
export interface ComponentProviderProps {
  overrides: ComponentOverride;
}

export type ComponentOverride = {
  [Component in ProviderComponents]?: {
    render: ComponentType<any>;
    method: 'replace' | 'wrap';
  };
};

export type ComponentContextShape = {
  [Component in ProviderComponents]: ComponentRegistry[Component] &
    Partial<ComponentOverride[Component]>;
};
