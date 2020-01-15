import * as React from 'react';
const SvgShare = ({ title, size, color, width, height, ...props }) =>
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
        'M26 21c-1.6 0-3 .8-4 2l-11.2-5.8c.2-.4.2-.8.2-1.2s0-.8-.2-1.2L22 9c1 1.2 2.4 2 4 2 2.8 0 5-2.2 5-5s-2.2-5-5-5-5 2.2-5 5c0 .4 0 .8.2 1.2L10 13c-1-1.2-2.4-2-4-2-2.8 0-5 2.2-5 5s2.2 5 5 5c1.6 0 3-.8 4-2l11.2 5.6c-.2.4-.2.8-.2 1.2 0 2.8 2.2 5 5 5s5-2.2 5-5-2.2-4.8-5-4.8zm0-18c1.6 0 3 1.4 3 3s-1.4 3-3 3-3-1.4-3-3 1.4-3 3-3zM6 19c-1.6 0-3-1.4-3-3s1.4-3 3-3 3 1.4 3 3-1.4 3-3 3zm20 10c-1.6 0-3-1.4-3-3s1.4-3 3-3 3 1.4 3 3-1.4 3-3 3z',
    })
  );
export default SvgShare;
//# sourceMappingURL=ShareIcon.js.map
