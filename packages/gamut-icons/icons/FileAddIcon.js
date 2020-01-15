import * as React from 'react';
const SvgFileAdd = ({ title, size, color, width, height, ...props }) =>
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
      { fill: 'none', fillRule: 'evenodd' },
      React.createElement('path', {
        d:
          'M4 0h11.172a2 2 0 011.414.586L19 3l2.414 2.414A2 2 0 0122 6.828V22a2 2 0 01-2 2H4a2 2 0 01-2-2V2a2 2 0 012-2zm1 2a1 1 0 00-1 1v18a1 1 0 001 1h14a1 1 0 001-1V8h-5a1 1 0 01-1-1V2H5zm11 4h3l-1.5-1.5L16 3v3z',
        fill: color || 'currentColor',
      }),
      React.createElement('path', {
        d: 'M9 15h6m-3-3v6',
        stroke: color || 'currentColor',
        strokeLinecap: 'round',
        strokeWidth: 2,
      })
    )
  );
export default SvgFileAdd;
//# sourceMappingURL=FileAddIcon.js.map
