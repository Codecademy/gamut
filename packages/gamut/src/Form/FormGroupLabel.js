import React from 'react';
import cx from 'classnames';
import s from './styles/FormGroupLabel.scss';
const FormGroupLabel = ({ htmlFor, className, ...rest }) => {
  const classNames = cx(s.FormGroupLabel, className);
  if (htmlFor) {
    return React.createElement(
      'label',
      Object.assign({}, rest, { htmlFor: htmlFor, className: classNames })
    );
  }
  return React.createElement(
    'div',
    Object.assign({}, rest, { className: classNames })
  );
};
export default FormGroupLabel;
//# sourceMappingURL=FormGroupLabel.js.map
