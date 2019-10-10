import React from 'react';
import { defaultIconProps } from '../defaultIconProps';
const TypeIcon = props => {
  return React.createElement(
    'svg',
    Object.assign({}, props),
    React.createElement('title', null, 'Type Icon'),
    React.createElement('path', {
      d:
        'M5.026 7.026a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm14 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm-14 1a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm14 0a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm-14.03-5v-1h14v1h-14zm3.03 19v-1h8v1h-8zm0-1h8v1h-8v-1zm1.886-.005h4.202V2.966H9.912v18.055zm5.114-18.995v20h-6v-20h6z',
    })
  );
};
TypeIcon.defaultProps = defaultIconProps;
export default TypeIcon;
//# sourceMappingURL=TypeIcon.js.map
