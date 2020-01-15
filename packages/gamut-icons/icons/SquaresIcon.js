import * as React from 'react';
const SvgSquares = ({ title, size, color, width, height, ...props }) =>
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
        'M6.9.1L6.8 0H0v6.9h6.9V.2c.1 0 .1 0 0-.1zm9 0l-.1-.1H9.1v6.9H16V.2l-.1-.1zm-9 9L6.8 9H0v6.9h6.9V9.2c.1 0 .1 0 0-.1zm9 0l-.1-.1H9.1v6.9H16V9.2l-.1-.1z',
    })
  );
export default SvgSquares;
//# sourceMappingURL=SquaresIcon.js.map
