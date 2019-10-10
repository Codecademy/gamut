import cx from 'classnames';
import React from 'react';
import s from './styles.scss';
const MenuItem = ({ as: As = 'a', asProps = {}, selected, children }) => {
  const childClassName = cx(s.link, asProps.className);
  return React.createElement(
    'li',
    { className: cx(s.menuItem, { [s.selected]: selected }) },
    React.createElement(
      As,
      Object.assign({}, asProps, { className: childClassName }),
      children
    )
  );
};
export default MenuItem;
//# sourceMappingURL=index.js.map
