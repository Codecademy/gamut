import * as React from 'react';

import { useField } from '../../ConnectedForm';
import { GridFormInputGroup } from '../GridFormInputGroup';
import { GridFormField } from '../types';

export type GridFormContentProps = {
  field: GridFormField;
  showRequired: boolean;
};

export const GridFormContent: React.FC<GridFormContentProps> = ({
  field,
  showRequired,
}) => {
  const { error, isFirstError, register, setValue, isDisabled } = useField({
    name: field.name,
    disabled: field.disabled,
  });

  const requiredBoolean = !!(
    field.type !== 'hidden' &&
    field.type !== 'sweet-container' &&
    field.validation?.required
  );

  return (
    <GridFormInputGroup
      error={error}
      isFirstError={isFirstError}
      isDisabled={isDisabled}
      field={field}
      key={field.name}
      register={register}
      setValue={setValue}
      required={requiredBoolean}
      showRequired={showRequired}
    />
  );
};
