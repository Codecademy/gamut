import * as React from 'react';
const SvgBell = ({ title, size, color, width, height, ...props }) =>
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
        'M16 17H8v-6.5C8 8 9.778 6 12 6s4 2 4 4.5V17zm2.118-1v-5.5c0-3.07-2.014-5.64-4.706-6.32V3.5c0-.828-.632-1.5-1.412-1.5-.78 0-1.412.672-1.412 1.5v.68c-2.7.68-4.706 3.25-4.706 6.32V16L4 18v1h16v-1l-1.882-2zM12 22a2 2 0 002-2h-4a2 2 0 002 2z',
    })
  );
export default SvgBell;
//# sourceMappingURL=BellIcon.js.map
