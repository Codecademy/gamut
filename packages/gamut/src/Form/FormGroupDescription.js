import React from 'react';
import cx from 'classnames';
import s from './styles/FormGroupDescription.scss';
const FormGroupDescription = props => {
  const className = cx(s.FormGroupDescription, props.className);
  return React.createElement(
    'div',
    Object.assign({}, props, { className: className })
  );
};
export default FormGroupDescription;
//# sourceMappingURL=FormGroupDescription.js.map
