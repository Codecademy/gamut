import React from 'react';
import { FieldError, useFormContext } from 'react-hook-form';

import { GridFormInputGroup } from '../GridFormInputGroup';

export type GridFormSectionProps = {
  fields: any;
  showRequired: boolean;
  pastFirstError: boolean;
};

export const GridFormSection: React.FC<GridFormSectionProps> = ({
  fields,
  showRequired,
  pastFirstError,
}) => {
  const { register, errors, setValue } = useFormContext();

  return (
    <>
      {fields.map((field) => {
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
      })}
    </>
  );
};
