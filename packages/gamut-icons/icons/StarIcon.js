import * as React from 'react';
const SvgStar = ({ title, size, color, width, height, ...props }) =>
  React.createElement(
    'svg',
    Object.assign(
      {
        viewBox: '0 0 48 48',
        width: size || width || '1em',
        height: size || height || '1em',
        fill: color || 'currentColor',
        role: 'img',
      },
      props
    ),
    React.createElement('title', null, title),
    React.createElement('path', {
      d:
        'M24 38.525l-14.625 7.69 2.793-16.286L.336 18.395l16.351-2.376L24 1.202l7.313 14.817 16.351 2.376L35.832 29.93l2.793 16.285z',
      fillRule: 'evenodd',
    })
  );
export default SvgStar;
//# sourceMappingURL=StarIcon.js.map
