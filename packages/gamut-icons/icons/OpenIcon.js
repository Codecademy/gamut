import * as React from 'react';
const SvgOpen = ({ title, size, color, width, height, ...props }) =>
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
    React.createElement('path', {
      d:
        'M13.778 4v1.778h3.19l-8.737 8.738 1.253 1.253 8.738-8.738v3.191H20V4h-6.222zm4.444 14.222H5.778V5.778H12V4H5.778C4.79 4 4 4.8 4 5.778v12.444C4 19.204 4.796 20 5.778 20h12.444c.982 0 1.778-.796 1.778-1.778V12h-1.778v6.222z',
    })
  );
export default SvgOpen;
//# sourceMappingURL=OpenIcon.js.map
