import React from 'react';
import { defaultIconProps } from '../defaultIconProps';
const PhoneIcon = props => {
  return React.createElement(
    'svg',
    Object.assign({}, props),
    React.createElement('title', null, 'Phone Icon'),
    React.createElement(
      'g',
      { fillRule: 'evenodd' },
      React.createElement('path', {
        fill: 'currentColor',
        d:
          'M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 3v14h8V5H8z',
      }),
      React.createElement('path', { fill: 'transparent', d: 'M8 5h8v14H8z' })
    )
  );
};
PhoneIcon.defaultProps = defaultIconProps;
export default PhoneIcon;
//# sourceMappingURL=PhoneIcon.js.map
