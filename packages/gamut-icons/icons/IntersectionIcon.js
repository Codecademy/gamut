import * as React from 'react';
const SvgIntersection = ({ title, size, color, width, height, ...props }) =>
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
      d: 'M8 14A5 5 0 108 4a5 5 0 000 10zm0 1A6 6 0 118 3a6 6 0 010 12z',
    }),
    React.createElement('path', {
      d: 'M16 14a5 5 0 100-10 5 5 0 000 10zm0 1a6 6 0 110-12 6 6 0 010 12z',
    }),
    React.createElement('path', {
      d: 'M12 20a5 5 0 100-10 5 5 0 000 10zm0 1a6 6 0 110-12 6 6 0 010 12z',
    })
  );
export default SvgIntersection;
//# sourceMappingURL=IntersectionIcon.js.map
