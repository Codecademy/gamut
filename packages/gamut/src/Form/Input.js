import React from 'react';
import cx from 'classnames';
import s from './styles/Input.scss';
const Input = ({ error, htmlFor, className, ...rest }) => {
  const classNames = cx(
    s.Input,
    {
      [s.error]: error,
    },
    className
  );
  return React.createElement(
    'input',
    Object.assign({}, rest, { id: htmlFor, className: classNames })
  );
};
Input.defaultProps = {
  type: 'text',
};
export default Input;
//# sourceMappingURL=Input.js.map
