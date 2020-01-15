import * as React from 'react';
const SvgCheckHeavy = ({ title, size, color, width, height, ...props }) =>
  React.createElement(
    'svg',
    Object.assign(
      {
        viewBox: '0 0 16 16',
        width: size || width || '1em',
        height: size || height || '1em',
        fill: color || 'currentColor',
        role: 'img',
      },
      props
    ),
    React.createElement('title', null, title),
    React.createElement('path', {
      fill: color || 'currentColor',
      d: 'M11.2 4.6L6.7 9.1l-2-2-1.4 1.5L6.7 12l6-6-1.5-1.4z',
    })
  );
export default SvgCheckHeavy;
//# sourceMappingURL=CheckHeavyIcon.js.map
