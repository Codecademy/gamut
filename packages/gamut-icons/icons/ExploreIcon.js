import * as React from 'react';
const SvgExplore = ({ title, size, color, width, height, ...props }) =>
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
        'M16 2c7.8 0 14 6.2 14 14s-6.2 14-14 14S2 23.8 2 16 8.2 2 16 2zm0-2C7.2 0 0 7.2 0 16s7.2 16 16 16 16-7.2 16-16S24.8 0 16 0z',
    }),
    React.createElement('path', {
      fill: color || 'currentColor',
      d:
        'M18 16a2 2 0 11-3.999.001A2 2 0 0118 16zm-3-4.8L7.6 7.6l3.6 7.4c.4-2 1.8-3.4 3.8-3.8zm5.8 5.8c-.4 1.8-1.8 3.4-3.8 3.8l7.4 3.6-3.6-7.4z',
    })
  );
export default SvgExplore;
//# sourceMappingURL=ExploreIcon.js.map
