import * as React from 'react';
const SvgLock = ({ title, size, color, width, height, ...props }) =>
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
      d:
        'M26 13h-2v-2c0-6-2.8-10-8-10S8 5 8 11v2H6c-1 0-2 1-2 2.2V29c0 1.2 1 2 2 2h20c1 0 2-.8 2-2V15c0-1.2-1-2-2-2zm-16-2c0-2.4.6-8 6-8s6 5.6 6 8v2H10v-2zm16 18H6V15h20v14z',
    })
  );
export default SvgLock;
//# sourceMappingURL=LockIcon.js.map
