import * as React from 'react';
const SvgFolderAdd = ({ title, size, color, width, height, ...props }) =>
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
          'M2 0h6.382a1 1 0 01.894.553L11 4h11a2 2 0 012 2v16a2 2 0 01-2 2H2a2 2 0 01-2-2V2a2 2 0 012-2zm1 2a1 1 0 00-1 1v18a1 1 0 001 1h18a1 1 0 001-1V7a1 1 0 00-1-1H10L8 2H3z',
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
export default SvgFolderAdd;
//# sourceMappingURL=FolderAddIcon.js.map
