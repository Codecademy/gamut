import React from 'react';
import { defaultIconProps } from '../defaultIconProps';
const MenuIcon = props => {
  return React.createElement(
    'svg',
    Object.assign({}, props),
    React.createElement(
      'g',
      { fillRule: 'nonzero' },
      React.createElement('path', {
        d: 'M20 11v2H4v-2zM20 17v2H4v-2zM20 5v2H4V5z',
      })
    )
  );
};
MenuIcon.defaultProps = defaultIconProps;
export default MenuIcon;
//# sourceMappingURL=MenuIcon.js.map
