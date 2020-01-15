import * as React from 'react';
const SvgInProgress = ({ title, size, color, width, height, ...props }) =>
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
      d:
        'M20 16a4 4 0 11-8 0 4 4 0 018 0zM8 16a4 4 0 11-8 0 4 4 0 018 0zm24 0a4 4 0 11-8 0 4 4 0 018 0z',
    })
  );
export default SvgInProgress;
//# sourceMappingURL=InProgressIcon.js.map
