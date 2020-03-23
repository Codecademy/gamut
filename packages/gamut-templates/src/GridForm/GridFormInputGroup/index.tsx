import {
  FormError,
  FormGroup,
  FormGroupLabel,
  Column,
} from '@codecademy/gamut';
import React from 'react';
import { FormContextValues } from 'react-hook-form';

import { GridFormField } from '../types';
import GridFormTextInput from './GridFormTextInput';
import GridFormSelectInput from './GridFormSelectInput';
import styles from './styles.module.scss';

export type GridFormInputGroupProps = {
  error?: string;
  field: GridFormField;
  register: FormContextValues['register'];
  setValue: (value: string) => void;
};

export const GridFormInputGroup: React.FC<GridFormInputGroupProps> = ({
  error,
  field,
  register,
  setValue,
}) => {
  const input =
    field.type === 'select' ? (
      <GridFormSelectInput
        className={styles.gridFormInput}
        field={field}
        register={register}
        setValue={setValue}
      />
    ) : (
      <GridFormTextInput
        className={styles.gridFormInput}
        field={field}
        register={register}
        setValue={setValue}
      />
    );

  return (
    <Column size={field.size}>
      <FormGroup className={styles.formGroup}>
        <FormGroupLabel className={styles.formGroupLabel} htmlFor={field.name}>
          {field.label}
        </FormGroupLabel>
        {error && <FormError>{error}</FormError>}
        {input}
      </FormGroup>
    </Column>
  );
};

export default GridFormInputGroup;
