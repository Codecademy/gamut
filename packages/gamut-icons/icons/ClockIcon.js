import * as React from 'react';
const SvgClock = ({ title, size, color, width, height, ...props }) =>
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
        'M12 20a8 8 0 100-16 8 8 0 000 16zm0-18a10 10 0 0110 10c0 5.523-4.477 10-10 10-5.53 0-10-4.5-10-10C2 6.477 6.477 2 12 2zm.5 5v5.25l4.5 2.67-.75 1.23L11 13V7h1.5z',
    })
  );
export default SvgClock;
//# sourceMappingURL=ClockIcon.js.map
