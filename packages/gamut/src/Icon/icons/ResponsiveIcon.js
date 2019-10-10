import React from 'react';
import { defaultIconProps } from '../defaultIconProps';
const ResponsiveIcon = props => {
  return React.createElement(
    'svg',
    Object.assign({}, props),
    React.createElement('title', null, 'Responsive Icon'),
    React.createElement(
      'g',
      { fill: 'none', stroke: 'currentColor' },
      React.createElement('rect', {
        x: '.5',
        y: '.5',
        width: '11',
        height: '14',
        rx: '1',
        transform: 'rotate(90 6 11)',
      }),
      React.createElement('path', {
        d: 'M18.5 11.5h3',
        strokeLinecap: 'square',
      }),
      React.createElement('rect', {
        x: '18.5',
        y: '10.5',
        width: '3',
        height: '6',
        rx: '1',
      })
    ),
    React.createElement('path', { d: 'M3 5h13v2H3z' }),
    React.createElement('path', {
      d:
        'M6 8l.636 6.3 2.86.7 2.868-.7L13 8H6zm5.967 6l-2.463.605-2.457-.598-.57-5.625h6.06L11.968 14z',
    }),
    React.createElement('path', {
      d:
        'M7.044 9.457h4.384l-.159 1.522H8.48l.053.456h2.693l-.185 1.728-1.443.342-.08.023-.096-.023-1.461-.342-.08-.723h-.528l.115 1.073L9.5 14l2.033-.487L12 9H7z',
    })
  );
};
ResponsiveIcon.defaultProps = defaultIconProps;
export default ResponsiveIcon;
//# sourceMappingURL=ResponsiveIcon.js.map
