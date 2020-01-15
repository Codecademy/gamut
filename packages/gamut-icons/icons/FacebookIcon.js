import * as React from 'react';
const SvgFacebook = ({ title, size, color, width, height, ...props }) =>
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
        'M6.1 16V8.5h-2V5.8h2V3.5C6.1 1.7 7.3 0 10 0c1.1 0 1.9.1 1.9.1l-.1 2.5h-1.7C9.1 2.6 9 3 9 3.8v2h2.9l-.1 2.7H8.9V16H6.1z',
    })
  );
export default SvgFacebook;
//# sourceMappingURL=FacebookIcon.js.map
