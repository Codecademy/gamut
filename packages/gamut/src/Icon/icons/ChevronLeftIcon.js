import React from 'react';
import { defaultIconProps } from '../defaultIconProps';
const ChevronLeftIcon = props => {
  return React.createElement(
    'svg',
    Object.assign({}, props),
    React.createElement('title', null, 'Chevron Left Icon'),
    React.createElement('path', {
      d:
        'M9.475 12.06l7.293 7.294-1.414 1.414-8.708-8.707 8.708-8.707 1.414 1.414z',
    })
  );
};
ChevronLeftIcon.defaultProps = defaultIconProps;
export default ChevronLeftIcon;
//# sourceMappingURL=ChevronLeftIcon.js.map
