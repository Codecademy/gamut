import * as React from 'react';
const SvgMaintenance = ({ title, size, color, width, height, ...props }) =>
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
    React.createElement(
      'g',
      { transform: 'translate(2 2)' },
      React.createElement('circle', { cx: 10, cy: 10, r: 10 }),
      React.createElement('path', {
        d:
          'M8.5 4v3H8V5.157a5.772 5.772 0 00-.975.458A5.763 5.763 0 004.254 10h11.463c.018.166.03.333.033.5a5.762 5.762 0 00-2.92-4.948 5.772 5.772 0 00-.83-.38V7h-.5V4h-1.268v1.5h-.5V4H8.5zm7.25 6.5H3.5c-.277 0-.5.223-.5.5v.5c0 .277.223.5.5.5h13c.277 0 .5-.223.5-.5V11c0-.277-.223-.5-.5-.5h-.75zm-5.768-3a1 1 0 110 2 1 1 0 010-2z',
        fill: '#FFF',
      })
    )
  );
export default SvgMaintenance;
//# sourceMappingURL=MaintenanceIcon.js.map
