import * as React from 'react';
const SvgLockHeavy = ({ title, size, color, width, height, ...props }) =>
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
        'M12.6 7.3V4.6c0-2.5-2-4.6-4.6-4.6S3.4 2.1 3.4 4.6v2.6H1.8V16h12.4V7.3h-1.6zm-7.1 0V4.6c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5v2.6h-5z',
    })
  );
export default SvgLockHeavy;
//# sourceMappingURL=LockHeavyIcon.js.map
