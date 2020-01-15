import * as React from 'react';
const SvgArrowChevronDown = ({ title, size, color, width, height, ...props }) =>
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
        'M20.293 7.293l1.414 1.414L12 18.414 2.293 8.707l1.414-1.414L12 15.586z',
    })
  );
export default SvgArrowChevronDown;
//# sourceMappingURL=ArrowChevronDownIcon.js.map
