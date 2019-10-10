import cx from 'classnames';
import React from 'react';
import s from './styles.scss';
export const Badge = ({ children, rootProps = {} }) => {
  const combinedProps = {
    ...rootProps,
    className: cx(s.badge, rootProps.className),
  };
  return React.createElement(
    'span',
    Object.assign({}, combinedProps),
    children
  );
};
export default Badge;
//# sourceMappingURL=index.js.map
