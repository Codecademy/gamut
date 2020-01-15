import * as React from 'react';
const SvgFile = ({ title, size, color, width, height, ...props }) =>
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
        'M22 0H12C9.8 0 8 1.8 8 4v24c0 2.2 1.8 4 4 4h16c2.2 0 4-1.8 4-4V10L22 0zm8 28c0 1.2-.8 2-2 2H12c-1.2 0-2-.8-2-2V4c0-1.2.8-2 2-2h8v10h10v16z',
    })
  );
export default SvgFile;
//# sourceMappingURL=FileIcon.js.map
