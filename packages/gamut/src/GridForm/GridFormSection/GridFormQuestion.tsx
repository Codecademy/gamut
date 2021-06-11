import React from 'react';
import { FieldError, useFormContext } from 'react-hook-form';

import { GridFormInputGroup } from '../GridFormInputGroup';
import { GridFormField } from '../types';

export type GridFormQuestionProps = {
  field: GridFormField;
  showRequired: boolean;
  pastFirstError: boolean;
};

export const GridFormQuestion: React.FC<GridFormQuestionProps> = ({
  field,
  showRequired,
  pastFirstError,
}) => {
  const { register, errors, setValue } = useFormContext();
  const errorMessage = (errors[field.name] as FieldError)?.message;
  const isFirstError = !pastFirstError && errorMessage !== undefined;
  pastFirstError = pastFirstError || isFirstError;
  const requiredBoolean = !!(
    field.type !== 'hidden' &&
    field.type !== 'sweet-container' &&
    field.validation?.required
  );
  return (
    <GridFormInputGroup
      error={errorMessage as string}
      isFirstError={isFirstError}
      field={field}
      key={field.name}
      register={register}
      setValue={setValue}
      required={requiredBoolean}
      showRequired={showRequired}
    />
  );
};
