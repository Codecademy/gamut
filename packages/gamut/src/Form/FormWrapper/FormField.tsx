import React from 'react';
import { FieldError, useFormContext } from 'react-hook-form';

import { GridFormInputGroup } from '../GridForm/GridFormInputGroup';
import { GridFormField } from '../GridForm/types';

export type GridFormContentProps = {
  field: GridFormField;
};

export const FormField: React.FC<GridFormContentProps> = ({ field }) => {
  const { register, errors, setValue } = useFormContext();

  /**
   * Keep track of the first error in this form.
   * This is so we only add the correct aria-live props on the first error.
   */
  const isFirstError = Object.keys(errors)[0] === field.name;
  const errorMessage = (errors[field.name] as FieldError)?.message;

  const requiredBoolean = !!(
    field.type !== 'hidden' &&
    field.type !== 'sweet-container' &&
    field.validation?.required
  );

  return (
    <>
      <GridFormInputGroup
        error={errorMessage}
        isFirstError={isFirstError}
        field={field}
        key={field.name}
        register={register}
        setValue={setValue}
        required={requiredBoolean}
        showRequired={false}
      />
    </>
  );
};
