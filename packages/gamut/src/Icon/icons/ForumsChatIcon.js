import React from 'react';
import { defaultIconProps } from '../defaultIconProps';
const ForumsChatIcon = props => {
  return React.createElement(
    'svg',
    Object.assign({}, props),
    React.createElement('title', null, 'ForumsChat Icon'),
    React.createElement('path', {
      d:
        'M18.4 4H5.6A1.6 1.6 0 0 0 4 5.6V20l3.2-3.2h11.2a1.6 1.6 0 0 0 1.6-1.6V5.6A1.6 1.6 0 0 0 18.4 4m0 11.2H7.2l-1.6 1.6V5.6h12.8',
      fillRule: 'nonzero',
    })
  );
};
ForumsChatIcon.defaultProps = defaultIconProps;
export default ForumsChatIcon;
//# sourceMappingURL=ForumsChatIcon.js.map
