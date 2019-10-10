import React from 'react';
import cx from 'classnames';
import s from './styles/FormGroup.scss';
import FormGroupDescription from './FormGroupDescription';
import FormGroupLabel from './FormGroupLabel';
const FormGroup = ({
  label,
  description,
  htmlFor,
  children,
  className,
  ...rest
}) => {
  const classNames = cx(s.FormGroup, className);
  const labelComponent = label
    ? React.createElement(FormGroupLabel, { htmlFor: htmlFor }, label)
    : null;
  const descriptionComponent = description
    ? React.createElement(
        FormGroupDescription,
        { 'aria-live': 'assertive' },
        description
      )
    : null;
  return React.createElement(
    'div',
    Object.assign({}, rest, { className: classNames }),
    labelComponent,
    descriptionComponent,
    children
  );
};
export default FormGroup;
//# sourceMappingURL=FormGroup.js.map
