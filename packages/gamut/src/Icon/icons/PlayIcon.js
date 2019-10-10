import React from 'react';
import { defaultIconProps } from '../defaultIconProps';
const PlayIcon = props => {
  return React.createElement(
    'svg',
    Object.assign({}, props),
    React.createElement('title', null, 'Play Icon'),
    React.createElement(
      'g',
      { fill: 'none', fillRule: 'evenodd' },
      React.createElement('path', {
        d: 'm15 10-8 5v-10z',
        fill: 'currentColor',
        transform: 'translate(2 2)',
      }),
      React.createElement('circle', {
        cx: '12',
        cy: '12',
        r: '9.5',
        stroke: 'currentColor',
      })
    )
  );
};
PlayIcon.defaultProps = defaultIconProps;
export default PlayIcon;
//# sourceMappingURL=PlayIcon.js.map
