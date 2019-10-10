import React from 'react';
import { defaultIconProps } from '../defaultIconProps';
const CloseIcon = props => {
  return React.createElement(
    'svg',
    Object.assign({}, props),
    React.createElement(
      'g',
      { fillRule: 'nonzero' },
      React.createElement('path', {
        d: 'M19.778 18.364l-1.414 1.414L4.222 5.636l1.414-1.414z',
      }),
      React.createElement('path', {
        d: 'M5.636 19.778l-1.414-1.414L18.364 4.222l1.414 1.414z',
      })
    )
  );
};
CloseIcon.defaultProps = defaultIconProps;
export default CloseIcon;
//# sourceMappingURL=CloseIcon.js.map
