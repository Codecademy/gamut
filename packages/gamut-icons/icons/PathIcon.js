import * as React from 'react';
const SvgPath = ({ title, size, color, width, height, ...props }) =>
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
    React.createElement(
      'g',
      { fill: 'none', fillRule: 'evenodd', stroke: 'currentColor' },
      React.createElement('path', { d: 'M5 21h7v-6m0-6V3h7' }),
      React.createElement('circle', { strokeWidth: 2, cx: 12, cy: 12, r: 2 }),
      React.createElement('circle', { strokeWidth: 2, cx: 3, cy: 21, r: 2 }),
      React.createElement('circle', { strokeWidth: 2, cx: 21, cy: 3, r: 2 })
    )
  );
export default SvgPath;
//# sourceMappingURL=PathIcon.js.map
