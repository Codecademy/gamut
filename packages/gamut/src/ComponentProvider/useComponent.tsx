import React, { ComponentProps, useContext, useMemo } from 'react';

import { ComponentContext } from './ComponentProvider';
import { ProviderComponents } from './types';

export const useComponent = (component: ProviderComponents) => {
  const {
    base: BaseComponent,
    method,
    render: Override,
    replaceComponent,
  } = useContext(ComponentContext)[component];

  return useMemo(() => {
    if (!Override || !method) return BaseComponent;

    if (method === 'replace') {
      return replaceComponent(BaseComponent, Override);
    }
    if (method === 'wrap') {
      return (props: ComponentProps<typeof Override>) => (
        <Override {...props}>
          <BaseComponent {...props} />
        </Override>
      );
    }
    return BaseComponent;
  }, [method, BaseComponent, Override, replaceComponent]);
};
