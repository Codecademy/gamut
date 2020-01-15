import * as React from 'react';
const SvgCheck = ({ title, size, color, width, height, ...props }) =>
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
      d: 'M21 7L9 19l-5.5-5.5 1.41-1.41L9 16.17 19.59 5.59z',
    })
  );
export default SvgCheck;
//# sourceMappingURL=CheckIcon.js.map
