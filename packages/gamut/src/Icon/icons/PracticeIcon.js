import React from 'react';
import { defaultIconProps } from '../defaultIconProps';
const PracticeIcon = props => {
  return React.createElement(
    'svg',
    Object.assign({}, props),
    React.createElement('title', null, 'Practice Icon'),
    React.createElement(
      'g',
      { transform: 'rotate(-45 19.071 9.485)', fillRule: 'evenodd' },
      React.createElement('path', { d: 'M9 4.667h7.111v3.556H9z' }),
      React.createElement('rect', {
        x: '17',
        width: '4',
        height: '12',
        rx: '1',
      }),
      React.createElement('rect', {
        x: '4',
        width: '4',
        height: '12',
        rx: '1',
      }),
      React.createElement('rect', {
        x: '22',
        y: '2',
        width: '3',
        height: '8',
        rx: '1',
      }),
      React.createElement('rect', { y: '2', width: '3', height: '8', rx: '1' })
    )
  );
};
PracticeIcon.defaultProps = defaultIconProps;
export default PracticeIcon;
//# sourceMappingURL=PracticeIcon.js.map
