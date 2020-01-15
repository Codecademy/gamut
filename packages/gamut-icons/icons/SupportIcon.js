import * as React from 'react';
const SvgSupport = ({ title, size, color, width, height, ...props }) =>
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
        'M18 23.8c0 .2-.2.2-.2.2h-3.4c-.2 0-.4 0-.4-.2v-1.6c0-.2 0-.2.2-.2h3.4c.2 0 .2 0 .2.2v1.6zm1.6-8.6l-1.4 2.2c-.4.4-.4 1-.4 1.8v.6c0 .2 0 .2-.2.2h-3.2c-.2 0-.4-.2-.4-.4v-1c0-1 .4-1.8 1-2.4l1.6-2.2c.6-.8 1-1.4 1-2 0-1-.6-1.6-1.6-1.6s-1.6.8-1.8 1.8c0 .2-.2.2-.4.2l-2.6-.4s-.2 0-.2-.2c.4-2.4 2.2-4 5-4s4.8 1.8 4.8 4.4c.2 1-.4 2-1.2 3z',
    })
  );
export default SvgSupport;
//# sourceMappingURL=SupportIcon.js.map
