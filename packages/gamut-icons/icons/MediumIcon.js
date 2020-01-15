import * as React from 'react';
const SvgMedium = ({ title, size, color, width, height, ...props }) =>
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
        'M16 3.5h-.6c-.2 0-.6.3-.6.6V12c0 .2.3.5.6.5h.6v1.9h-5.7v-1.9h1.2V4.2h-.1L8.6 14.3H6.4L3.7 4.2h-.1v8.3h1.2v1.9H0v-1.9h.6c.3 0 .6-.3.6-.5V4.1c0-.2-.3-.6-.6-.6H0V1.7h6L8 9l2-7.3h6v1.8z',
    })
  );
export default SvgMedium;
//# sourceMappingURL=MediumIcon.js.map
