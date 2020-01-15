import * as React from 'react';
const SvgLearn = ({ title, size, color, width, height, ...props }) =>
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
        'M15 16.6l4.351-4.6L15 7.4 16.324 6 22 12l-5.676 6L15 16.6zm-6 0L4.649 12 9 7.4 7.676 6 2 12l5.676 6L9 16.6z',
    })
  );
export default SvgLearn;
//# sourceMappingURL=LearnIcon.js.map
