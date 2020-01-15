import * as React from 'react';
const SvgTag = ({ title, size, color, width, height, ...props }) =>
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
        'M0 0v7.2L8.8 16 16 8.8 7.2 0H0zm4.6 4.6c-.6.5-1.5.5-2.1 0-.6-.6-.6-1.6 0-2.2s1.5-.6 2.1 0c.6.6.6 1.6 0 2.2z',
    })
  );
export default SvgTag;
//# sourceMappingURL=TagIcon.js.map
