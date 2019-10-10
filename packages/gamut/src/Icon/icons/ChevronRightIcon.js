import React from 'react';
import { defaultIconProps } from '../defaultIconProps';
const ChevronRightIcon = props => {
  return React.createElement(
    'svg',
    Object.assign({}, props),
    React.createElement('title', null, 'Chevron Right Icon'),
    React.createElement('path', {
      d:
        'M13.94 12.06L6.645 4.769l1.415-1.414 8.707 8.707-8.707 8.707-1.415-1.414z',
    })
  );
};
ChevronRightIcon.defaultProps = defaultIconProps;
export default ChevronRightIcon;
//# sourceMappingURL=ChevronRightIcon.js.map
