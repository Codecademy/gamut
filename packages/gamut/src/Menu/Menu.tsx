import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import { ComponentProps, forwardRef } from 'react';

import type { ListProps } from './elements';
import { List } from './elements';
import { MenuProvider, useMenu } from './MenuContext';

/** Props for Menu. Use when wrapping or composing Menu. */
export interface MenuProps extends Omit<ListProps, 'root'> {
  children?: React.ReactNode;
}

const MenuComponent = forwardRef<
  HTMLUListElement | HTMLOListElement,
  Omit<ComponentProps<typeof List>, 'root'>
>(
  (
    { children, variant = 'popover', spacing = 'normal', role, ...rest },
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

export const Menu = MenuComponent as unknown as ForwardRefExoticComponent<
  MenuProps & RefAttributes<HTMLUListElement | HTMLOListElement>
>;
