import { ComponentProps, forwardRef } from 'react';

import { MenuList } from './elements';
import { MenuProvider, useMenu } from './MenuContext';

export const Menu = forwardRef<
  HTMLUListElement | HTMLOListElement,
  Omit<ComponentProps<typeof MenuList>, 'root'>
>(
  (
    { children, variant = 'popover', spacing = 'normal', role, ...rest },
    ref
  ) => {
    const currentContext = useMenu({ variant, role, spacing });

    return (
      <MenuList {...rest} {...currentContext} ref={ref}>
        <MenuProvider value={currentContext}>{children}</MenuProvider>
      </MenuList>
    );
  }
);
