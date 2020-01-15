import * as React from 'react';
const SvgPerson = ({ title, size, color, width, height, ...props }) =>
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
        'M12 3a4 4 0 110 8 4 4 0 010-8zm0 9c4.42 0 8 2.387 8 5.333V20H4v-2.667C4 14.387 7.58 12 12 12z',
    })
  );
export default SvgPerson;
//# sourceMappingURL=PersonIcon.js.map
