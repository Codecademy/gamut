import * as React from 'react';
const SvgPlayCircled = ({ title, size, color, width, height, ...props }) =>
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
      { fill: 'none', fillRule: 'evenodd' },
      React.createElement('path', {
        d: 'M17 12l-8 5V7z',
        fill: 'currentColor',
      }),
      React.createElement('circle', {
        cx: 12,
        cy: 12,
        r: 9.5,
        stroke: 'currentColor',
      })
    )
  );
export default SvgPlayCircled;
//# sourceMappingURL=PlayCircledIcon.js.map
