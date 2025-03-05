import { ComponentProps, forwardRef } from 'react';

import { List } from './elements';
import { MenuProvider, useMenu } from './MenuContext';

export const Menu = forwardRef<
  HTMLUListElement | HTMLOListElement,
  Omit<ComponentProps<typeof List>, 'root'>
>(
  (
    {
      children,
      variant = 'popover',
      spacing = 'normal',
      role,
      borderRadius = 'sm',
      ...rest
    },
    ref
  ) => {
    const currentContext = useMenu({ variant, role, spacing });

    return (
      <List {...rest} {...currentContext} borderRadius={borderRadius} ref={ref}>
        <MenuProvider value={currentContext}>{children}</MenuProvider>
      </List>
    );
  }
);
