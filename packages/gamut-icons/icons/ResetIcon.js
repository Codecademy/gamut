import * as React from 'react';
const SvgReset = ({ title, size, color, width, height, ...props }) =>
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
        'M5.338 10.91A6.752 6.752 0 0112 5.25c1.868 0 3.533.776 4.748 2.003l-3.623 3.622H21V3l-2.644 2.644A8.953 8.953 0 0012 3c-4.621 0-8.488 3.426-9 7.91m15.724 2.265a6.752 6.752 0 01-6.648 5.575c-1.867 0-3.532-.776-4.747-2.003l3.622-3.622H3.076V21l2.644-2.644A8.953 8.953 0 0012.076 21 9.002 9.002 0 0021 13.177',
    })
  );
export default SvgReset;
//# sourceMappingURL=ResetIcon.js.map
