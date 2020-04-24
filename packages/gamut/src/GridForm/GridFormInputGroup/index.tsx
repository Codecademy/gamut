import React, { useEffect } from 'react';
import { FormContextValues } from 'react-hook-form';

import { FormError, FormGroup, FormGroupLabel } from '../../Form';
import { Column } from '../../Layout';
import { GridFormField } from '../types';
import GridFormCheckboxInput from './GridFormCheckboxInput';
import GridFormCustomInput from './GridFormCustomInput';
import GridFormFileInput from './GridFormFileInput';
import GridFormTextInput from './GridFormTextInput';
import GridFormSelectInput from './GridFormSelectInput';
import GridFormTextArea from './GridFormTextArea';
import styles from './styles.module.scss';

export type GridFormInputGroupProps = {
  error?: string;
  field: GridFormField;
  register: FormContextValues['register'];
  setValue: (value: any) => void;
  watch: FormContextValues['watch'];
};

export const GridFormInputGroup: React.FC<GridFormInputGroupProps> = props => {
  const inputValue = props.watch(props.field.name);
  const { onUpdate } = props.field;
  useEffect(() => {
    onUpdate?.(inputValue);
  }, [inputValue, onUpdate]);

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

      case 'custom':
        return (
          <GridFormCustomInput
            className={styles.gridFormInput}
            field={props.field}
            register={props.register}
            setValue={props.setValue}
          />
        );

      case 'email':
      case 'text':
        return (
          <GridFormTextInput
            className={styles.gridFormInput}
            error={!!props.error}
            field={props.field}
            register={props.register}
          />
        );

      case 'select':
        return (
          <GridFormSelectInput
            className={styles.gridFormInput}
            error={!!props.error}
            field={props.field}
            register={props.register}
          />
        );

      case 'file':
        return (
          <GridFormFileInput
            className={styles.gridFormInput}
            error={!!props.error}
            field={props.field}
            register={props.register}
          />
        );

      case 'textarea':
        return (
          <GridFormTextArea
            className={styles.gridFormInput}
            error={!!props.error}
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
