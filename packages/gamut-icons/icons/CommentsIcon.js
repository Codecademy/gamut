import * as React from 'react';
const SvgComments = ({ title, size, color, width, height, ...props }) =>
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
        'M30 4v18H13.2L8 27.2V22H2V4h28zm0-2H2C.8 2 0 2.8 0 4v18c0 1.2.8 2 2 2h4v8l8-8h16c1.2 0 2-.8 2-2V4c0-1.2-.8-2-2-2z',
    }),
    React.createElement('path', {
      fill: color || 'currentColor',
      d: 'M8 12h16v2H8v-2zm0-4h16v2H8V8zm0 8h16v2H8v-2z',
    })
  );
export default SvgComments;
//# sourceMappingURL=CommentsIcon.js.map
