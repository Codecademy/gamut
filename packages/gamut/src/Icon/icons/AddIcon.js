import React from 'react';
import { defaultIconProps } from '../defaultIconProps';
const AddIcon = props => {
  return React.createElement(
    'svg',
    Object.assign({}, props),
    React.createElement('title', null, 'Add Icon'),
    React.createElement(
      'g',
      { fillRule: 'evenodd' },
      React.createElement('path', { d: 'M11 4h2v16h-2z' }),
      React.createElement('path', { d: 'M20 11v2H4v-2z' })
    )
  );
};
AddIcon.defaultProps = defaultIconProps;
export default AddIcon;
//# sourceMappingURL=AddIcon.js.map
