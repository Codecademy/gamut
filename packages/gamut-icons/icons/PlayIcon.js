import * as React from 'react';
const SvgPlay = ({ title, size, color, width, height, ...props }) =>
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
    React.createElement('path', { d: 'M18 12L6 20V4z', fillRule: 'evenodd' })
  );
export default SvgPlay;
//# sourceMappingURL=PlayIcon.js.map
