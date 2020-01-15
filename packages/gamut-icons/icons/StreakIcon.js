import * as React from 'react';
const SvgStreak = ({ title, size, color, width, height, ...props }) =>
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
      d:
        'M9.8 1L4 8.7s0 .1.1.1l2.8-.3s.1 0 .1.1L6.8 15c0 .1.1.1.1 0l5.8-7.6s0-.1-.1-.1l-2.8.3s-.1 0-.1-.1L9.9 1c0-.1-.1-.1-.1 0z',
    })
  );
export default SvgStreak;
//# sourceMappingURL=StreakIcon.js.map
