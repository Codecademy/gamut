import * as React from 'react';
const SvgAlert = ({ title, size, color, width, height, ...props }) =>
  React.createElement(
    'svg',
    Object.assign(
      {
        fill: color || 'currentColor',
        viewBox: '0 0 24 24',
        width: size || width || '1em',
        height: size || height || '1em',
        role: 'img',
      },
      props
    ),
    React.createElement('title', null, title),
    React.createElement('path', {
      d:
        'M12.526 12.526h-1.914V6.785h1.914v5.741zm0 3.828h-1.914V14.44h1.914v1.914zM11.568 2a9.568 9.568 0 100 19.137 9.568 9.568 0 000-19.137z',
    })
  );
export default SvgAlert;
//# sourceMappingURL=AlertIcon.js.map
