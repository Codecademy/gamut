import * as React from 'react';
const SvgMenu = ({ title, size, color, width, height, ...props }) =>
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
    React.createElement('path', { d: 'M20 11v2H4v-2zm0 6v2H4v-2zm0-12v2H4V5z' })
  );
export default SvgMenu;
//# sourceMappingURL=MenuIcon.js.map
