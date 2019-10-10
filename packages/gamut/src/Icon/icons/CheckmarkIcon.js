import React from 'react';
import { defaultIconProps } from '../defaultIconProps';
const CheckmarkIcon = props => {
  return React.createElement(
    'svg',
    Object.assign({}, props),
    React.createElement('title', null, 'Checkmark Icon'),
    React.createElement('path', {
      d: 'm18 2-12 12-5.5-5.5 1.41-1.41 4.09 4.08 10.59-10.58z',
      transform: 'translate(3 5)',
    })
  );
};
CheckmarkIcon.defaultProps = defaultIconProps;
export default CheckmarkIcon;
//# sourceMappingURL=CheckmarkIcon.js.map
