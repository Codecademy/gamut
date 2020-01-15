import * as React from 'react';
const SvgArrowThinDown = ({ title, size, color, width, height, ...props }) =>
  React.createElement(
    'svg',
    Object.assign(
      {
        viewBox: '0 0 32 32',
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
      d: 'M16 20L5.2 13.8l1-1.8 9.8 5.8 9.8-5.8 1 1.8z',
    })
  );
export default SvgArrowThinDown;
//# sourceMappingURL=ArrowThinDownIcon.js.map
