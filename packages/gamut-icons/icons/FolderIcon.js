import * as React from 'react';
const SvgFolder = ({ title, size, color, width, height, ...props }) =>
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
        'M30 14v12H6V14h24zM14 4H6c-1.2 0-2 .8-2 2v20c0 1.2.8 2 2 2h24c1.2 0 2-.8 2-2V10c0-1.2-.8-2-2-2H16V6c0-1.2-.8-2-2-2zm-8 8V6h8v4h16v2H6z',
    })
  );
export default SvgFolder;
//# sourceMappingURL=FolderIcon.js.map
