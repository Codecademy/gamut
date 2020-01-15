import * as React from 'react';
const SvgEditor = ({ title, size, color, width, height, ...props }) =>
  React.createElement(
    'svg',
    Object.assign(
      {
        viewBox: '0 0 32 32',
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
        'M2.8 16l5-5c.2-.4.2-1 0-1.2-.4-.4-1-.4-1.4 0L0 16l6.4 6.4c.2.2.4.2.8.2s.6 0 .8-.2c.4-.4.4-1 0-1.4l-5.2-5zm26.4 0l-5-5c-.2-.4-.2-1 0-1.2.4-.4 1-.4 1.4 0L32 16l-6.4 6.4c-.2.2-.4.2-.8.2s-.6 0-.8-.2c-.4-.4-.4-1 0-1.4l5.2-5zM17.099 4.008l1.97.347-4.166 23.635-1.97-.347 4.166-23.635z',
    })
  );
export default SvgEditor;
//# sourceMappingURL=EditorIcon.js.map
