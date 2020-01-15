import * as React from 'react';
const SvgInstructions = ({ title, size, color, width, height, ...props }) =>
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
        'M26 4c1.2 0 2 .8 2 2v20c0 1.2-.8 2-2 2H6c-1.2 0-2-.8-2-2V6c0-1.2.8-2 2-2h20zm0-2H6C3.8 2 2 3.8 2 6v20c0 2.2 1.8 4 4 4h20c2.2 0 4-1.8 4-4V6c0-2.2-1.8-4-4-4z',
    }),
    React.createElement('path', {
      fill: color || 'currentColor',
      d: 'M12.6 24l-5.4-5.2 1.6-1.6 3.8 4 10.6-10.6 1.6 1.4z',
    })
  );
export default SvgInstructions;
//# sourceMappingURL=InstructionsIcon.js.map
