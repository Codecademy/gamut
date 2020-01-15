import * as React from 'react';
const SvgCalendar = ({ title, size, color, width, height, ...props }) =>
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
        'M15 6.8c0 .1-.1.2-.2.2h-3.6c-.1 0-.2-.1-.2-.2V4.2c0-.1.1-.2.2-.2h3.6c.1 0 .2.1.2.2v2.6zm0 4c0 .1-.1.2-.2.2h-3.6c-.1 0-.2-.1-.2-.2V8.2c0-.2.1-.2.2-.2h3.6c.1 0 .2 0 .2.2v2.6zm0 4c0 .1-.1.2-.2.2h-3.6c-.1 0-.2-.1-.2-.2v-2.5c0-.1.1-.2.2-.2h3.6c.1 0 .2.1.2.2v2.5zm-5-8c0 .1-.1.2-.2.2H6.2c-.1 0-.2-.1-.2-.2V4.2c0-.1.1-.2.2-.2h3.6c.1 0 .2.1.2.2v2.6zm0 4c0 .1-.1.2-.2.2H6.2c-.1 0-.2-.1-.2-.2V8.2c0-.2.1-.2.2-.2h3.6c.1 0 .2 0 .2.2v2.6zm0 4c0 .1-.1.2-.2.2H6.2c-.1 0-.2-.1-.2-.2v-2.5c0-.2.1-.3.2-.3h3.6c.1 0 .2.1.2.2v2.6zm-5-8c0 .1-.1.2-.2.2H1.2c-.1 0-.2-.1-.2-.2V4.2c0-.1.1-.2.2-.2h3.6c.1 0 .2.1.2.2v2.6zm0 4c0 .1-.1.2-.2.2H1.2c-.1 0-.2-.1-.2-.2V8.2c0-.2.1-.2.2-.2h3.6c.1 0 .2 0 .2.2v2.6zm0 4c0 .1-.1.2-.2.2H1.2c-.1 0-.2-.1-.2-.2v-2.5c0-.2.1-.3.2-.3h3.6c.1 0 .2.1.2.2v2.6zM15.8 0H.2C.1 0 0 .1 0 .2v15.5c0 .2.1.3.2.3h15.6c.1 0 .2-.1.2-.2V.2c0-.1-.1-.2-.2-.2z',
    })
  );
export default SvgCalendar;
//# sourceMappingURL=CalendarIcon.js.map
