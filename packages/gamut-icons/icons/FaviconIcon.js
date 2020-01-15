import * as React from 'react';
const SvgFavicon = ({ title, size, color, width, height, ...props }) =>
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
        'M5.6 6.4c.4 0 .7.2 1 .5 0 .1.1.1.2 0l.7-.6c.1 0 0-.1 0-.2-.5-.5-1.1-.8-1.9-.8-1.1 0-1.9.5-2.2 1.5 0 .3-.1.7-.1 1.3s.1 1 .2 1.3c.3.9 1.1 1.5 2.2 1.5.8 0 1.4-.3 1.8-.8v-.2l-.7-.6h-.2c-.3.3-.5.5-1 .5s-.8-.2-1-.7c-.1-.3-.1-.6-.1-1s0-.7.1-1c.2-.4.6-.7 1-.7zm10.3 6.8h-3.7c-.1 0-.1 0-.1.1v1c0 .1 0 .1.1.1h3.7c.1 0 .1 0 .1-.1v-1c0-.1 0-.1-.1-.1z',
    }),
    React.createElement('path', {
      fill: color || 'currentColor',
      d:
        'M11 1.7c-.1-.1-.1-.1 0 0H.1c-.1-.1-.1 0-.1 0v12.6h11V1.7zM9.8 13c0 .1-.1.1 0 0l-.1.1H1.3l-.1-.1V3s0-.1.1-.1h8.3l.1.1v10z',
    })
  );
export default SvgFavicon;
//# sourceMappingURL=FaviconIcon.js.map
