import * as React from 'react';
const SvgProject = ({ title, size, color, width, height, ...props }) =>
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
        'M18.857 11.571h-1.286V8.143c0-.952-.771-1.714-1.714-1.714H12.43V5.143a2.143 2.143 0 10-4.286 0v1.286h-3.43C3.768 6.429 3 7.196 3 8.143V11.4h1.286A2.305 2.305 0 016.6 13.714a2.305 2.305 0 01-2.314 2.315H3v3.257C3 20.232 3.768 21 4.714 21h3.257v-1.286a2.305 2.305 0 012.315-2.314 2.305 2.305 0 012.314 2.314V21h3.257c.947 0 1.714-.768 1.714-1.714v-3.429h1.286a2.143 2.143 0 000-4.286z',
    })
  );
export default SvgProject;
//# sourceMappingURL=ProjectIcon.js.map
