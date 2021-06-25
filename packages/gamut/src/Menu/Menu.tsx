import React, { useContext } from 'react';

import { List, ListProps } from './elements';
import { MenuContext } from './MenuContext';

const heirarchyProps = {
  parent: {
    parent: true,
    role: 'menu',
  },
  child: {
    role: 'group',
  },
};

export const Menu = React.forwardRef<
  HTMLUListElement | HTMLOListElement,
  Omit<ListProps, 'heirarchy'>
>(({ children, variant = 'select', spacing = 'normal', ...rest }, ref) => {
  const { depth, ...parentProps } = useContext(MenuContext);
  const isRoot = depth === 0;
  const heirachy = isRoot ? 'parent' : 'child';
  const nextDepth = depth + 1;

  const props = heirarchyProps[heirachy] as ListProps;

  return (
    <List {...rest} {...props} ref={ref}>
      <MenuContext.Provider
        value={{
          variant: isRoot ? variant : parentProps.variant,
          spacing: isRoot ? spacing : parentProps.spacing,
          depth: nextDepth,
        }}
      >
        {children}
      </MenuContext.Provider>
    </List>
  );
});
