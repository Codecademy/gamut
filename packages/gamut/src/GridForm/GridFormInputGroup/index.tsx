import React from 'react';
import { FormContextValues } from 'react-hook-form';

import { FormError, FormGroup, FormGroupLabel } from '../../Form';
import { Column } from '../../Layout';
import { GridFormField } from '../types';
import GridFormCheckboxInput from './GridFormCheckboxInput';
import GridFormTextInput from './GridFormTextInput';
import GridFormSelectInput from './GridFormSelectInput';
import styles from './styles.module.scss';

export type GridFormInputGroupProps = {
  error?: string;
  field: GridFormField;
  register: FormContextValues['register'];
};

export const GridFormInputGroup: React.FC<GridFormInputGroupProps> = props => {
  const getInput = () => {
    switch (props.field.type) {
      case 'checkbox':
        return (
          <GridFormCheckboxInput
            className={styles.gridFormInput}
            field={props.field}
            register={props.register}
          />
        );

      case 'email':
      case 'text':
        return (
          <GridFormTextInput
            className={styles.gridFormInput}
            field={props.field}
            register={props.register}
          />
        );

      case 'select':
        return (
          <GridFormSelectInput
            className={styles.gridFormInput}
            field={props.field}
            register={props.register}
          />
        );
    }
  };

  return (
    <Column size={props.field.size}>
      <FormGroup className={styles.formGroup}>
        <FormGroupLabel
          className={styles.formGroupLabel}
          htmlFor={props.field.name}
        >
          {props.field.label}
        </FormGroupLabel>
        {props.error && <FormError>{props.error}</FormError>}
        {getInput()}
      </FormGroup>
    </Column>
  );
};

export default GridFormInputGroup;
