import cx from 'classnames';
import React from 'react';
import s from './styles.scss';
const SideMenu = ({ children, className }) => {
  return React.createElement(
    'ul',
    { className: cx(s.sideMenu, className) },
    children
  );
};
export default SideMenu;
//# sourceMappingURL=index.js.map
