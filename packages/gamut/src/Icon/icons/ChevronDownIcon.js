import React from 'react';
import { defaultIconProps } from '../defaultIconProps';
const ChevronDownIcon = props => {
  return React.createElement(
    'svg',
    Object.assign({}, props),
    React.createElement('title', null, 'Chevron Down Icon'),
    React.createElement('path', {
      d:
        'M20.293 7.293l1.414 1.414L12 18.414 2.293 8.707l1.414-1.414L12 15.586z',
    })
  );
};
ChevronDownIcon.defaultProps = defaultIconProps;
export default ChevronDownIcon;
//# sourceMappingURL=ChevronDownIcon.js.map
