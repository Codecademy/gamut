import { ComponentProps, forwardRef } from 'react';

import { List } from './elements';
import { MenuProvider, useMenu } from './MenuContext';

export const Menu = forwardRef<
  HTMLUListElement | HTMLOListElement,
  Omit<ComponentProps<typeof List>, 'root' | 'role'>
>(({ children, variant = 'select', spacing = 'normal', ...rest }, ref) => {
  const currentContext = useMenu({ variant, spacing });

  return (
    <List {...rest} {...currentContext} ref={ref}>
      <MenuProvider value={currentContext}>{children}</MenuProvider>
    </List>
  );
});
