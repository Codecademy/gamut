import React from 'react';
import { defaultIconProps } from '../defaultIconProps';
const LeftArrowIcon = props => {
  return React.createElement(
    'svg',
    Object.assign({ transform: 'rotate(180)' }, props),
    React.createElement('title', null, 'Left Arrow Icon'),
    React.createElement('path', {
      d:
        'M4 10.92v2h12l-5.5 5.5 1.42 1.42 7.92-7.92L11.92 4 10.5 5.42l5.5 5.5z',
      fillRule: 'nonzero',
    })
  );
};
LeftArrowIcon.defaultProps = defaultIconProps;
export default LeftArrowIcon;
//# sourceMappingURL=LeftArrowIcon.js.map
