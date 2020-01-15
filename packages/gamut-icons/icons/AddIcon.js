import * as React from 'react';
const SvgAdd = ({ title, size, color, width, height, ...props }) =>
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
      { fillRule: 'evenodd' },
      React.createElement('path', { d: 'M11 4h2v16h-2z' }),
      React.createElement('path', { d: 'M20 11v2H4v-2z' })
    )
  );
export default SvgAdd;
//# sourceMappingURL=AddIcon.js.map
