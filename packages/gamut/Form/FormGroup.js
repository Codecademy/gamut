import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import s from './styles/FormGroup';
import FormGroupDescription from './FormGroupDescription';
import FormGroupLabel from './FormGroupLabel';

const FormGroup = ({label, description, htmlFor, children, className, ...rest}) => {
  const classNames = cx(s.FormGroup, className);

  const labelComponent = label ? (
    <FormGroupLabel htmlFor={htmlFor}>{label}</FormGroupLabel>
  ) : null;

  const descriptionComponent = description ? (
    <FormGroupDescription>{description}</FormGroupDescription>
  ) : null;

  return (
    <div {...rest} className={classNames}>
      {labelComponent}
      {descriptionComponent}
      {children}
    </div>
  );
};

FormGroup.propTypes = {
  htmlFor: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node
};

export default FormGroup;
