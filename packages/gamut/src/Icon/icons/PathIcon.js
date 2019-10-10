import React from 'react';
import { defaultIconProps } from '../defaultIconProps';
const PathIcon = props => {
  return React.createElement(
    'svg',
    Object.assign({}, props),
    React.createElement('title', null, 'Path Icon'),
    React.createElement(
      'g',
      { fill: 'none', fillRule: 'evenodd' },
      React.createElement('path', {
        stroke: 'currentColor',
        d: 'M5 21h7v-6M12 9V3h7',
      }),
      React.createElement('circle', {
        stroke: 'currentColor',
        strokeWidth: '2',
        cx: '12',
        cy: '12',
        r: '2',
      }),
      React.createElement('circle', {
        stroke: 'currentColor',
        strokeWidth: '2',
        cx: '3',
        cy: '21',
        r: '2',
      }),
      React.createElement('circle', {
        stroke: 'currentColor',
        strokeWidth: '2',
        cx: '21',
        cy: '3',
        r: '2',
      })
    )
  );
};
PathIcon.defaultProps = defaultIconProps;
export default PathIcon;
//# sourceMappingURL=PathIcon.js.map
