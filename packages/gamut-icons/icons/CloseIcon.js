import * as React from 'react';
const SvgClose = ({ title, size, color, width, height, ...props }) =>
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
      d: 'M19.778 18.364l-1.414 1.414L4.222 5.636l1.414-1.414z',
    }),
    React.createElement('path', {
      d: 'M5.636 19.778l-1.414-1.414L18.364 4.222l1.414 1.414z',
    })
  );
export default SvgClose;
//# sourceMappingURL=CloseIcon.js.map
