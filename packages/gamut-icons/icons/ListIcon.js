import * as React from 'react';
const SvgList = ({ title, size, color, width, height, ...props }) =>
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
        'M4 8h2v2H4V8zm6 0h17.8v2H10V8zm-6 8h2v2H4v-2zm6 0h18v2H10v-2zm-6 8h2v2H4v-2zm6 0h18v2H10v-2z',
    })
  );
export default SvgList;
//# sourceMappingURL=ListIcon.js.map
