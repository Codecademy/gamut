import React from 'react';
import { FormContextValues } from 'react-hook-form';

import { FormError, FormGroup, FormGroupLabel } from '../../Form';
import { Column } from '../../Layout';
import { GridFormField } from '../types';
import GridFormCheckboxInput from './GridFormCheckboxInput';
import GridFormCustomInput from './GridFormCustomInput';
import GridFormFileInput from './GridFormFileInput';
import GridFormRadioGroupInput from './GridFormRadioGroupInput';
import GridFormTextInput from './GridFormTextInput';
import GridFormSelectInput from './GridFormSelectInput';
import GridFormTextArea from './GridFormTextArea';
import styles from './styles.module.scss';

export type GridFormInputGroupProps = {
  error?: string;
  field: GridFormField;
  register: FormContextValues['register'];
  setValue: (value: any) => void;
};

export const GridFormInputGroup: React.FC<GridFormInputGroupProps> = (
  props
) => {
  const getInput = () => {
    switch (props.field.type) {
      case 'checkbox':
        return (
          <GridFormCheckboxInput
            className={styles.gridFormInput}
            field={props.field}
            register={props.register}
            id={props.field.id}
          />
        );

      case 'custom':
        return (
          <GridFormCustomInput
            className={styles.gridFormInput}
            field={props.field}
            register={props.register}
            setValue={props.setValue}
            error={props.error}
          />
        );

      case 'radio-group':
        return (
          <GridFormRadioGroupInput
            className={styles.gridFormInput}
            field={props.field}
            register={props.register}
            setValue={props.setValue}
            id={props.field.id}
          />
        );

      case 'select':
        return (
          <GridFormSelectInput
            className={styles.gridFormInput}
            error={!!props.error}
            field={props.field}
            register={props.register}
            id={props.field.id}
          />
        );

      case 'file':
        return (
          <GridFormFileInput
            className={styles.gridFormInput}
            error={!!props.error}
            field={props.field}
            register={props.register}
            id={props.field.id}
          />
        );

      case 'textarea':
        return (
          <GridFormTextArea
            className={styles.gridFormInput}
            error={!!props.error}
            field={props.field}
            register={props.register}
            id={props.field.id}
          />
        );

      default:
        return (
          <GridFormTextInput
            className={styles.gridFormInput}
            error={!!props.error}
            field={props.field}
            register={props.register}
            id={props.field.id}
          />
        );
    }
  };

  return (
    <Column size={props.field.size}>
      <FormGroup className={styles.formGroup}>
        <FormGroupLabel
          className={styles.formGroupLabel}
          htmlFor={props.field.id || props.field.name}
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
