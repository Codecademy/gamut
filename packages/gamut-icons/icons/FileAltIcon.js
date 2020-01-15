import * as React from 'react';
const SvgFileAlt = ({ title, size, color, width, height, ...props }) =>
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
      className: 'file-alt_svg__file-alt_svg__st0',
      d:
        'M18 0H8C5.8 0 4 1.8 4 4v24c0 2.2 1.8 4 4 4h16c2.2 0 4-1.8 4-4V10L18 0zm8 28c0 1.2-.8 2-2 2H8c-1.2 0-2-.8-2-2V4c0-1.2.8-2 2-2h8v10h10v16z',
    }),
    React.createElement('path', {
      className: 'file-alt_svg__file-alt_svg__st0',
      d: 'M10 24h12v2H10v-2zm0-4h12v2H10v-2zm0-4h12v2H10v-2z',
    })
  );
export default SvgFileAlt;
//# sourceMappingURL=FileAltIcon.js.map
