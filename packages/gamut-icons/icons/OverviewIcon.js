import * as React from 'react';
const SvgOverview = ({ title, size, color, width, height, ...props }) =>
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
        'M14.7 4v10.7H4V4h10.7zM16 2.7H2.7V16H16V2.7zM0 0v13.3h1.3v-12h12V0H0z',
    })
  );
export default SvgOverview;
//# sourceMappingURL=OverviewIcon.js.map
