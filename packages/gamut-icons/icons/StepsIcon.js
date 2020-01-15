import * as React from 'react';
const SvgSteps = ({ title, size, color, width, height, ...props }) =>
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
        'M28 8v20H8V8h20zm0-2H8c-1.2 0-2 .8-2 2v20c0 1.2.8 2 2 2h20c1.2 0 2-.8 2-2V8c0-1.2-.8-2-2-2z',
    }),
    React.createElement('path', {
      fill: color || 'currentColor',
      d:
        'M21 0H2C.8 0 0 .8 0 2v19c0 .6.4 1 1 1s1-.4 1-1V2h19c.6 0 1-.4 1-1s-.4-1-1-1z',
    })
  );
export default SvgSteps;
//# sourceMappingURL=StepsIcon.js.map
