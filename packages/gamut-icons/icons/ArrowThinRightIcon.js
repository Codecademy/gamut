import * as React from 'react';
const SvgArrowThinRight = ({ title, size, color, width, height, ...props }) =>
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
      d: 'M20 16l-6.2 10.8-1.8-1 5.8-9.8L12 6.2l1.8-1z',
    })
  );
export default SvgArrowThinRight;
//# sourceMappingURL=ArrowThinRightIcon.js.map
