import * as React from 'react';
const SvgTerminal = ({ title, size, color, width, height, ...props }) =>
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
      d: 'M2 4v16h20V4H2zm19 15H3V7h18v12zM3 6V5h18v.998L3 6z',
    }),
    React.createElement('path', { d: 'M4 8h1v2H4z' })
  );
export default SvgTerminal;
//# sourceMappingURL=TerminalIcon.js.map
