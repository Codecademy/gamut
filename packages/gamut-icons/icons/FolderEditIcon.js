import * as React from 'react';
const SvgFolderEdit = ({ title, size, color, width, height, ...props }) =>
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
        'M30 6.8H16v-2c0-1.2-.8-2-2-2H6c-1.2 0-2 .8-2 2v13.6l7.6-7.6H6v-6h8v4h16v2H17.8L19 12c.6.6 1 1.6 1 2.6s-.4 2-1.2 2.8l-2.8 3-6.4 6.4H30c1.2 0 2-.8 2-2v-16c0-1.2-.8-2-2-2z',
    }),
    React.createElement('path', {
      fill: color || 'currentColor',
      d:
        'M2.222 22.931l8.202-8.202 4.243 4.243-8.202 8.202-4.243-4.243zM17.4 16c.8-.8.8-2 0-2.8L16 11.8c-.8-.8-2-.8-2.8 0l-1.4 1.4 4.2 4.4 1.4-1.6zM0 29.2l5-.6-4.2-4.2z',
    })
  );
export default SvgFolderEdit;
//# sourceMappingURL=FolderEditIcon.js.map
