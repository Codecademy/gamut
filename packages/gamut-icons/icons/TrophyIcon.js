import * as React from 'react';
const SvgTrophy = ({ title, size, color, width, height, ...props }) =>
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
        'M6.503 3.801v5.404a5.404 5.404 0 1010.808 0V3.801H6.503zm6.305 12.554V19h2.894v1h-8v-1h3.304v-2.645a7.206 7.206 0 01-6.304-7.15V2h14.41v7.205a7.206 7.206 0 01-6.304 7.15zm-7.205 4.559h12v1h-12v-1z',
    }),
    React.createElement('path', {
      d:
        'M4.702 5.603H2.9v2.702c0 1.176.752 2.177 1.8 2.548.601.237.902.288.902.153 0-1.031-.3-2.833-.901-5.403zm.9 6.304A3.603 3.603 0 012 8.305V4.702h3.603v7.205zm13.51-6.304h1.802v2.702a2.703 2.703 0 01-1.802 2.548c-.6.237-.9.288-.9.153 0-1.031.3-2.833.9-5.403zm-.9 6.304a3.603 3.603 0 003.602-3.602V4.702h-3.602v7.205z',
    })
  );
export default SvgTrophy;
//# sourceMappingURL=TrophyIcon.js.map
