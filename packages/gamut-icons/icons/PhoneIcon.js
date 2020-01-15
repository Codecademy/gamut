import * as React from 'react';
const SvgPhone = ({ title, size, color, width, height, ...props }) =>
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
    React.createElement(
      'g',
      { fillRule: 'evenodd' },
      React.createElement('path', {
        d:
          'M8 2h8a2 2 0 012 2v16a2 2 0 01-2 2H8a2 2 0 01-2-2V4a2 2 0 012-2zm0 3v14h8V5H8z',
      }),
      React.createElement('path', { fill: 'transparent', d: 'M8 5h8v14H8z' })
    )
  );
export default SvgPhone;
//# sourceMappingURL=PhoneIcon.js.map
