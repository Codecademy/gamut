import * as React from 'react';
const SvgArrowThinUp = ({ title, size, color, width, height, ...props }) =>
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
      d: 'M16 12l10.8 6.2-1 1.8-9.8-5.8L6.2 20l-1-1.8z',
    })
  );
export default SvgArrowThinUp;
//# sourceMappingURL=ArrowThinUpIcon.js.map
