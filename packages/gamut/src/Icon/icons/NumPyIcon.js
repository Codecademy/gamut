import React from 'react';
import { defaultIconProps } from '../defaultIconProps';
const NumPyIcon = props => {
  return React.createElement(
    'svg',
    Object.assign({}, props),
    React.createElement('title', null, 'NumPy Icon'),
    React.createElement('path', {
      d:
        'M3 17h4v4H3zM3 12h4v4H3zM3 7h4v4H3zM3 2h4v4H3zM8 7h4v4H8zM12 12h4v4h-4zM17 17h4v4h-4zM17 12h4v4h-4zM17 7h4v4h-4zM17 2h4v4h-4z',
    })
  );
};
NumPyIcon.defaultProps = defaultIconProps;
export default NumPyIcon;
//# sourceMappingURL=NumPyIcon.js.map
