import React from 'react';
import cx from 'classnames';
import s from './styles/CardShell.scss';
const defaultProps = {
  hoverShadow: false,
};
const CardShell = ({ children, hoverShadow, className, style, role, id }) => {
  const shellClasses = cx(
    s.shell,
    {
      [s.hoverShadow]: hoverShadow,
    },
    className
  );
  return React.createElement(
    'div',
    Object.assign({ className: shellClasses }, { style, role, id }),
    children
  );
};
CardShell.defaultProps = defaultProps;
export default CardShell;
//# sourceMappingURL=CardShell.js.map
