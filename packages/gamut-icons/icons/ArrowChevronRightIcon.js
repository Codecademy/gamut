import * as React from 'react';
const SvgArrowChevronRight = ({
  title,
  size,
  color,
  width,
  height,
  ...props
}) =>
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
        'M13.94 12.06L6.645 4.769 8.06 3.355l8.707 8.707-8.707 8.707-1.415-1.414z',
    })
  );
export default SvgArrowChevronRight;
//# sourceMappingURL=ArrowChevronRightIcon.js.map
