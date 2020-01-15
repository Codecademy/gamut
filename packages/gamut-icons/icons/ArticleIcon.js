import * as React from 'react';
const SvgArticle = ({ title, size, color, width, height, ...props }) =>
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
        'M19 11.111H4.778V8.444H19v2.667zm0 3.556h-6.222v-1.778H19v1.778zm0 3.555h-6.222v-1.778H19v1.778zm-8 0H4.778V12.89H11v5.333zm8.293-12.738L17.818 4l-1.485 1.484L14.85 4l-1.476 1.484L11.89 4l-1.485 1.484L8.93 4 7.444 5.484 5.96 4 4.484 5.484 3 4v14.222C3 19.204 3.796 20 4.778 20H19c.982 0 1.778-.796 1.778-1.778V4l-1.485 1.484z',
    })
  );
export default SvgArticle;
//# sourceMappingURL=ArticleIcon.js.map
