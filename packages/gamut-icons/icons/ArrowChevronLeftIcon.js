import * as React from 'react';
const SvgArrowChevronLeft = ({ title, size, color, width, height, ...props }) =>
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
        'M9.475 12.06l7.293 7.294-1.414 1.414-8.708-8.707 8.708-8.707 1.414 1.414z',
    })
  );
export default SvgArrowChevronLeft;
//# sourceMappingURL=ArrowChevronLeftIcon.js.map
