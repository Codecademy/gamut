import * as React from 'react';
const SvgPractice = ({ title, size, color, width, height, ...props }) =>
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
      { transform: 'rotate(-45 19.071 9.485)', fillRule: 'evenodd' },
      React.createElement('path', { d: 'M9 4.667h7.111v3.556H9z' }),
      React.createElement('rect', { x: 17, width: 4, height: 12, rx: 1 }),
      React.createElement('rect', { x: 4, width: 4, height: 12, rx: 1 }),
      React.createElement('rect', { x: 22, y: 2, width: 3, height: 8, rx: 1 }),
      React.createElement('rect', { y: 2, width: 3, height: 8, rx: 1 })
    )
  );
export default SvgPractice;
//# sourceMappingURL=PracticeIcon.js.map
