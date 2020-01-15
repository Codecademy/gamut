import * as React from 'react';
const SvgUpload = ({ title, size, color, width, height, ...props }) =>
  React.createElement(
    'svg',
    Object.assign(
      {
        viewBox: '0 0 24 24',
        width: size || width || '1em',
        height: size || height || '1em',
        fill: color || 'currentColor',
        role: 'img',
      },
      props
    ),
    React.createElement('title', null, title),
    React.createElement(
      'g',
      {
        stroke: color || 'currentColor',
        strokeWidth: 2,
        fill: 'none',
        fillRule: 'evenodd',
        strokeLinecap: 'round',
      },
      React.createElement('path', {
        d: 'M22 17v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4',
      }),
      React.createElement('path', {
        d: 'M7 6l5-5 5 5m-5-4.25V18',
        strokeLinejoin: 'round',
      })
    )
  );
export default SvgUpload;
//# sourceMappingURL=UploadIcon.js.map
