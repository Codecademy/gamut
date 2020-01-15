import * as React from 'react';
const SvgMinimize = ({ title, size, color, width, height, ...props }) =>
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
        'M26 4.6l-6 6V5c0-.6-.4-1-1-1s-1 .4-1 1v9h9c.2 0 .6-.2.8-.2 0-.2.2-.6.2-.8 0-.6-.4-1-1-1h-5.6l6-6c.4-.4.4-1 0-1.4s-1-.4-1.4 0zM6 27.4l6-6V27c0 .6.4 1 1 1s1-.4 1-1v-9H5c-.2 0-.6.2-.8.2 0 .2-.2.6-.2.8 0 .6.4 1 1 1h5.6l-6 6c-.4.4-.4 1 0 1.4s1 .4 1.4 0z',
    })
  );
export default SvgMinimize;
//# sourceMappingURL=MinimizeIcon.js.map
