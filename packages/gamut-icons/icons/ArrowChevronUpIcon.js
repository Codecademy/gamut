import * as React from 'react';
const SvgArrowChevronUp = ({ title, size, color, width, height, ...props }) =>
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
      d: 'M20.293 18.414L21.707 17 12 7.293 2.293 17l1.414 1.414L12 10.121z',
    })
  );
export default SvgArrowChevronUp;
//# sourceMappingURL=ArrowChevronUpIcon.js.map
