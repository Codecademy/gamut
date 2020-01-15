import * as React from 'react';
const SvgArrowThinLeft = ({ title, size, color, width, height, ...props }) =>
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
      d: 'M12 16l6.2-10.8 1.8 1-5.8 9.8 5.8 9.8-1.8 1z',
    })
  );
export default SvgArrowThinLeft;
//# sourceMappingURL=ArrowThinLeftIcon.js.map
