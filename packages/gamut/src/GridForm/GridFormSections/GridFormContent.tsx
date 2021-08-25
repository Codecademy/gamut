import React from 'react';

import { GridFormInputGroup } from '../GridFormInputGroup';
import { GridFormField } from '../types';
import { useFieldContext } from '../utils';

export type GridFormContentProps = {
  field: GridFormField;
  showRequired: boolean;
};

export const GridFormContent: React.FC<GridFormContentProps> = ({
  field,
  showRequired,
}) => {
  const { error, isFirstError, register, setValue } = useFieldContext(
    field.name
  );

  const requiredBoolean = !!(
    field.type !== 'hidden' &&
    field.type !== 'sweet-container' &&
    field.validation?.required
  );

  return (
    <>
      <GridFormInputGroup
        error={error}
        isFirstError={isFirstError}
        field={field}
        key={field.name}
        register={register}
        setValue={setValue}
        required={requiredBoolean}
        showRequired={showRequired}
      />
    </>
  );
};
