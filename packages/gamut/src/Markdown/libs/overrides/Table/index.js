import React from 'react';
import s from './styles.scss';
const Table = ({ maxHeight, ...props }) => {
  return React.createElement(
    'div',
    { className: s.tableWrapper, style: { maxHeight } },
    React.createElement('table', Object.assign({}, props))
  );
};
export default Table;
//# sourceMappingURL=index.js.map
