import React from 'react';
import cx from 'classnames';
import s from './styles/CardBody.scss';
const defaultProps = {
  standardPadding: true,
};
const CardBody = ({ children, standardPadding, className }) => {
  const bodyClasses = cx(
    {
      [s.standardPadding]: standardPadding,
    },
    className
  );
  return React.createElement('div', { className: bodyClasses }, children);
};
CardBody.defaultProps = defaultProps;
export default CardBody;
//# sourceMappingURL=CardBody.js.map
