import { ComponentProps, forwardRef } from 'react';

import { List } from './elements';
import { MenuProvider, useMenu } from './MenuContext';

export const Menu = forwardRef<
  HTMLUListElement | HTMLOListElement,
  Omit<ComponentProps<typeof List>, 'root'>
>(
  (
    { children, variant = 'select', spacing = 'normal', role, ...rest },
    ref
  ) => {
    const currentContext = useMenu({ variant, role, spacing });

    return (
      <List {...rest} {...currentContext} ref={ref}>
        <MenuProvider value={currentContext}>{children}</MenuProvider>
      </List>
    );
  }
);
