import React from 'react';
import { defaultIconProps } from '../defaultIconProps';
const ChevronUpIcon = props => {
  return React.createElement(
    'svg',
    Object.assign({}, props),
    React.createElement('title', null, 'Chevron Up Icon'),
    React.createElement('path', {
      d: 'M20.293 18.414L21.707 17 12 7.293 2.293 17l1.414 1.414L12 10.121z',
    })
  );
};
ChevronUpIcon.defaultProps = defaultIconProps;
export default ChevronUpIcon;
//# sourceMappingURL=ChevronUpIcon.js.map
