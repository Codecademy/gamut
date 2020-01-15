import * as React from 'react';
const SvgZoom = ({ title, size, color, width, height, ...props }) =>
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
        'M15.9 14.4l-4.1-4.1c.8-1.1 1.2-2.4 1.2-3.8C13 2.9 10.1 0 6.6 0 3 0 .1 2.9.1 6.5S3 13 6.6 13c1.4 0 2.6-.4 3.7-1.1l4.2 4.2 1.4-1.7zM2 6.5C2 4 4 1.9 6.6 1.9c2.5 0 4.6 2.1 4.6 4.6s-2.1 4.6-4.6 4.6C4 11.1 2 9 2 6.5z',
    })
  );
export default SvgZoom;
//# sourceMappingURL=ZoomIcon.js.map
