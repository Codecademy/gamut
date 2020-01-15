import * as React from 'react';
const SvgPeople = ({ title, size, color, width, height, ...props }) =>
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
          'M8.522 5a3.043 3.043 0 110 6.087 3.043 3.043 0 010-6.087zm-.435 6.957c3.363 0 6.087 1.815 6.087 4.057v2.03H2v-2.03c0-2.242 2.724-4.057 6.087-4.057z',
        fillRule: 'nonzero',
      }),
      React.createElement('path', {
        d:
          'M15.043 18.043v-2.029c0-1.502-.874-2.814-2.173-3.515a8.506 8.506 0 013.043-.542c3.363 0 6.087 1.815 6.087 4.057v2.03h-6.957zM16.348 5a3.043 3.043 0 110 6.087 3.043 3.043 0 010-6.087z',
      })
    )
  );
export default SvgPeople;
//# sourceMappingURL=PeopleIcon.js.map
