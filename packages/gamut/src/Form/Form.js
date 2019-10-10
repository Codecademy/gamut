import React from 'react';
import cx from 'classnames';
import s from './styles/Form.scss';
const Form = ({ method = 'post', ...props }) => {
  const className = cx(s.Form, props.className);
  return React.createElement(
    'form',
    Object.assign({}, props, { method: method, className: className })
  );
};
export default Form;
//# sourceMappingURL=Form.js.map
