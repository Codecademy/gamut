import { FormError, FormGroup, FormGroupLabel, Column } from '@codecademy/gamut';
import React from 'react';
import GridFormCheckboxInput from './GridFormCheckboxInput';
import GridFormTextInput from './GridFormTextInput';
import GridFormSelectInput from './GridFormSelectInput';
import styles from './styles.module.scss';
export var GridFormInputGroup = function GridFormInputGroup(props) {
  var getInput = function getInput() {
    switch (props.field.type) {
      case 'checkbox':
        return React.createElement(GridFormCheckboxInput, {
          className: styles.gridFormInput,
          field: props.field,
          setValue: props.setValue
        });

      case 'email':
      case 'text':
        return React.createElement(GridFormTextInput, {
          className: styles.gridFormInput,
          field: props.field,
          register: props.register,
          setValue: props.setValue
        });

      case 'select':
        return React.createElement(GridFormSelectInput, {
          className: styles.gridFormInput,
          field: props.field,
          register: props.register,
          setValue: props.setValue
        });
    }
  };

  return React.createElement(Column, {
    size: props.field.size
  }, React.createElement(FormGroup, {
    className: styles.formGroup
  }, React.createElement(FormGroupLabel, {
    className: styles.formGroupLabel,
    htmlFor: props.field.name
  }, props.field.label), props.error && React.createElement(FormError, null, props.error), getInput()));
};
export default GridFormInputGroup;