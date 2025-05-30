import * as React from 'react';

import { getErrorMessage, useField } from '../../ConnectedForm/utils';
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
      field={field}
      isDisabled={isDisabled}
      isFirstError={isFirstError}
      isSoloField={isSoloField}
      key={field.name}
      register={register}
      required={requiredBoolean}
      setValue={setValue}
    />
  );
};
