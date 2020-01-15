import * as React from 'react';
const SvgCode = ({ title, size, color, width, height, ...props }) =>
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
      d:
        'M6.25 12l2.7-8h.95l-2.7 8h-.95zM1.6 8l3-1.75v-.9L0 8l4.6 2.65v-.9zm12.8 0l-3 1.75v.9L16 8l-4.6-2.65v.9z',
    })
  );
export default SvgCode;
//# sourceMappingURL=CodeIcon.js.map
