import { FormError, FormGroup, FormGroupLabel, Column } from '@codecademy/gamut';
import React from 'react';
import GridFormTextInput from './GridFormTextInput';
import GridFormSelectInput from './GridFormSelectInput';
import styles from './styles.module.scss';
export var GridFormInputGroup = function GridFormInputGroup(_ref) {
  var error = _ref.error,
      field = _ref.field,
      register = _ref.register,
      setValue = _ref.setValue;
  var input = field.type === 'select' ? React.createElement(GridFormSelectInput, {
    className: styles.gridFormInput,
    field: field,
    register: register,
    setValue: setValue
  }) : React.createElement(GridFormTextInput, {
    className: styles.gridFormInput,
    field: field,
    register: register,
    setValue: setValue
  });
  return React.createElement(Column, {
    size: field.size
  }, React.createElement(FormGroup, {
    className: styles.formGroup
  }, React.createElement(FormGroupLabel, {
    className: styles.formGroupLabel,
    htmlFor: field.name
  }, field.label), error && React.createElement(FormError, null, error), input));
};
export default GridFormInputGroup;