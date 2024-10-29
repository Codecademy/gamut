import * as React from 'react';

import { getErrorMessage, useField } from '../../ConnectedForm';
import { GridFormInputGroup } from '../GridFormInputGroup';
import { GridFormField } from '../types';

export type GridFormContentProps = {
  field: GridFormField;
};

export const GridFormContent: React.FC<GridFormContentProps> = ({ field }) => {
  const { error, isFirstError, register, setValue, isDisabled, isSoloField } =
    useField({
      name: field.name,
      disabled: field.disabled,
    });

  const requiredBoolean = !!(
    field.type !== 'hidden' &&
    field.type !== 'sweet-container' &&
    field.validation?.required
  );

  const textError = getErrorMessage(error);

  return (
    <GridFormInputGroup
      error={textError}
      isFirstError={isFirstError}
      isDisabled={isDisabled}
      field={field}
      key={field.name}
      register={register}
      isSoloField={isSoloField}
      setValue={setValue}
      required={requiredBoolean}
    />
  );
};
