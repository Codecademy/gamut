import React from 'react';

import { List, ListProps } from './elements';
import { MenuProvider, useMenu } from './MenuContext';

export const Menu = React.forwardRef<
  HTMLUListElement | HTMLOListElement,
  Omit<ListProps, 'root' | 'role'>
>(({ children, variant = 'select', spacing = 'normal', ...rest }, ref) => {
  const currentContext = useMenu({ variant, spacing });

  return (
    <List {...rest} {...currentContext} ref={ref}>
      <MenuProvider value={currentContext}>{children}</MenuProvider>
    </List>
  );
});
