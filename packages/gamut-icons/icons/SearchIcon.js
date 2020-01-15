import * as React from 'react';
const SvgSearch = ({ title, size, color, width, height, ...props }) =>
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
        'M9.583 2a7.583 7.583 0 017.584 7.583 7.601 7.601 0 01-1.82 4.935l.315.315h.921l5.834 5.834-1.75 1.75-5.834-5.834v-.921l-.315-.315a7.601 7.601 0 01-4.935 1.82A7.583 7.583 0 019.583 2zm0 2.333a5.228 5.228 0 00-5.25 5.25 5.228 5.228 0 005.25 5.25 5.228 5.228 0 005.25-5.25 5.228 5.228 0 00-5.25-5.25z',
    })
  );
export default SvgSearch;
//# sourceMappingURL=SearchIcon.js.map
