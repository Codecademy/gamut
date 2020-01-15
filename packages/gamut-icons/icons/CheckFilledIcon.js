import * as React from 'react';
const SvgCheckFilled = ({ title, size, color, width, height, ...props }) =>
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
        'M12 4a8 8 0 110 16 8 8 0 010-16zm-.8 11.6l5.6-5.6-1.128-1.128-4.472 4.464-2.472-2.464L7.6 12l3.6 3.6z',
    })
  );
export default SvgCheckFilled;
//# sourceMappingURL=CheckFilledIcon.js.map
