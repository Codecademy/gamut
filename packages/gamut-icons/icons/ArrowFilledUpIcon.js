import * as React from 'react';
const SvgArrowFilledUp = ({ title, size, color, width, height, ...props }) =>
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
      d: 'M8 19l8-6 8 6z',
    })
  );
export default SvgArrowFilledUp;
//# sourceMappingURL=ArrowFilledUpIcon.js.map
