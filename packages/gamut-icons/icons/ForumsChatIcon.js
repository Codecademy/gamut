import * as React from 'react';
const SvgForumsChat = ({ title, size, color, width, height, ...props }) =>
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
        'M18.4 4H5.6A1.6 1.6 0 004 5.6V20l3.2-3.2h11.2a1.6 1.6 0 001.6-1.6V5.6A1.6 1.6 0 0018.4 4m0 11.2H7.2l-1.6 1.6V5.6h12.8',
    })
  );
export default SvgForumsChat;
//# sourceMappingURL=ForumsChatIcon.js.map
