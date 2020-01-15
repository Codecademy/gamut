import * as React from 'react';
const SvgBulb = ({ title, size, color, width, height, ...props }) =>
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
      d:
        'M12 2a7 7 0 017 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 01-1 1H9a1 1 0 01-1-1v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 017-7zM9 21v-1h6v1a1 1 0 01-1 1h-4a1 1 0 01-1-1zm3-17a5 5 0 00-2 9.58V16h4v-2.42A5 5 0 0012 4z',
    })
  );
export default SvgBulb;
//# sourceMappingURL=BulbIcon.js.map
