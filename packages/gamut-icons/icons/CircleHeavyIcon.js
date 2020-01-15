import * as React from 'react';
const SvgCircleHeavy = ({ title, size, color, width, height, ...props }) =>
  React.createElement(
    'svg',
    Object.assign(
      {
        viewBox: '0 0 16 16',
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
        'M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 14.4c-3.6 0-6.4-2.9-6.4-6.4 0-3.6 2.9-6.4 6.4-6.4 3.6 0 6.4 2.9 6.4 6.4 0 3.6-2.8 6.4-6.4 6.4z',
    })
  );
export default SvgCircleHeavy;
//# sourceMappingURL=CircleHeavyIcon.js.map
