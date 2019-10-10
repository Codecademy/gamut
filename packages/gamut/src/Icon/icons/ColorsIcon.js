import React from 'react';
import { defaultIconProps } from '../defaultIconProps';
const ColorsIcon = props => {
  return React.createElement(
    'svg',
    Object.assign({}, props),
    React.createElement('title', null, 'Colors Icon'),
    React.createElement('path', {
      d:
        'M8 14A5 5 0 1 0 8 4a5 5 0 0 0 0 10zm0 1A6 6 0 1 1 8 3a6 6 0 0 1 0 12z',
    }),
    React.createElement('path', {
      d:
        'M16 14a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 1a6 6 0 1 1 0-12 6 6 0 0 1 0 12z',
    }),
    React.createElement('path', {
      d:
        'M12 20a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 1a6 6 0 1 1 0-12 6 6 0 0 1 0 12z',
    })
  );
};
ColorsIcon.defaultProps = defaultIconProps;
export default ColorsIcon;
//# sourceMappingURL=ColorsIcon.js.map
