import * as React from 'react';
const SvgBadge = ({ title, size, color, width, height, ...props }) =>
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
        'M13.7 6.4c-.6-1.7-.3-2.3.4-3l.6-.6C11.5.1 12.2.7 11.4 0c-.4.4-.8 1-1.7 1C8.9 1 8.3.3 8 0c-.4.4-.9 1-1.7 1C5.4 1 5 .3 4.6 0L1.4 2.8l.6.6c.7.7 1 1.2.4 3-.6 1.5-1.1 2.6-1.1 3.8 0 2.2 1.4 3.8 3.8 4.4 1.7.4 2 .6 2.9 1.4.9-.7 1.2-.9 2.9-1.4 2.4-.6 3.8-2.2 3.8-4.4 0-1.2-.5-2.3-1-3.8zm-4 2.2l.4 2.3L8 9.8l-2.1 1.1.4-2.3-1.6-1.7L7 6.6l1-2.1 1 2.1 2.3.3-1.6 1.7z',
    })
  );
export default SvgBadge;
//# sourceMappingURL=BadgeIcon.js.map
