import {
  FormError,
  FormGroup,
  FormGroupLabel,
  Column,
} from '@codecademy/gamut';
import React from 'react';
import { FormContextValues } from 'react-hook-form';

import { GridFormField } from '../types';
import GridFormCheckboxInput from './GridFormCheckboxInput';
import GridFormTextInput from './GridFormTextInput';
import GridFormSelectInput from './GridFormSelectInput';
import styles from './styles.module.scss';

export type GridFormInputGroupProps = {
  error?: string;
  field: GridFormField;
  register: FormContextValues['register'];
  setValue: (value: Required<GridFormField['defaultValue']>) => void;
};

export const GridFormInputGroup: React.FC<GridFormInputGroupProps> = props => {
  const getInput = () => {
    switch (props.field.type) {
      case 'checkbox':
        return (
          <GridFormCheckboxInput
            className={styles.gridFormInput}
            field={props.field}
            setValue={props.setValue}
          />
        );

      case 'email':
      case 'text':
        return (
          <GridFormTextInput
            className={styles.gridFormInput}
            field={props.field}
            register={props.register}
            setValue={props.setValue}
          />
        );

      case 'select':
        return (
          <GridFormSelectInput
            className={styles.gridFormInput}
            field={props.field}
            register={props.register}
            setValue={props.setValue}
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
