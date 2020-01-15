import * as React from 'react';
const SvgQuiz = ({ title, size, color, width, height, ...props }) =>
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
          'M2.053 7h10.105v1.263H2.053zm0 2.526h7.579v1.263h-7.58zm0 2.527h5.052v1.263H2.053zm0 2.526h2.526v1.263H2.053z',
      }),
      React.createElement('path', {
        d:
          'M18.616 5.343a1.16 1.16 0 00-.811.333l-1.607 1.607 4.017 4.024 1.606-1.591c.455-.463.455-1.183 0-1.622L19.42 5.676a1.157 1.157 0 00-.803-.333M15.66 7.82l-6.14 6.147 1.941.212.136 1.735 1.728.13.22 1.94 6.14-6.147M9.073 14.672l-1.327 5.07 5.078-1.356-.182-1.637-1.75-.129-.137-1.758',
        fillRule: 'nonzero',
      })
    )
  );
export default SvgQuiz;
//# sourceMappingURL=QuizIcon.js.map
