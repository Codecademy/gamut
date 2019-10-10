import React from 'react';
import { defaultIconProps } from '../defaultIconProps';
const SearchIcon = props => {
  return React.createElement(
    'svg',
    Object.assign({}, props),
    React.createElement('title', null, 'Search Icon'),
    React.createElement('path', {
      d:
        'M9.583 2a7.583 7.583 0 0 1 7.584 7.583 7.601 7.601 0 0 1-1.82 4.935l.315.315h.921l5.834 5.834-1.75 1.75-5.834-5.834v-.921l-.315-.315a7.601 7.601 0 0 1-4.935 1.82A7.583 7.583 0 0 1 9.583 2zm0 2.333a5.228 5.228 0 0 0-5.25 5.25 5.228 5.228 0 0 0 5.25 5.25 5.228 5.228 0 0 0 5.25-5.25 5.228 5.228 0 0 0-5.25-5.25z',
      fillRule: 'nonzero',
    })
  );
};
SearchIcon.defaultProps = defaultIconProps;
export default SearchIcon;
//# sourceMappingURL=SearchIcon.js.map
