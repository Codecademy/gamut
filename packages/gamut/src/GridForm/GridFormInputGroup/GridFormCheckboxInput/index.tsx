import React from 'react';
import { UseFormMethods } from 'react-hook-form';

import { Checkbox } from '../../../Form';
import { GridFormCheckboxField } from '../../types';

export type GridFormCheckboxInputProps = {
  className?: string;
  clearErrors: UseFormMethods['clearErrors'];
  field: GridFormCheckboxField;
  register: UseFormMethods['register'];
  showRequired?: boolean;
};

export const GridFormCheckboxInput: React.FC<GridFormCheckboxInputProps> = ({
  className,
  clearErrors,
  field,
  register,
  showRequired,
}) => {
  return (
    <Checkbox
      className={className}
      defaultChecked={field.defaultValue}
      disabled={field.disabled}
      htmlFor={field.name}
      name={field.name}
      onChange={(event) => {
        clearErrors();
        field.onUpdate?.(event.target.checked);
      }}
      label={field.description}
      multiline={field.multiline}
      ref={register(field.validation)}
      id={field.id}
      aria-required={showRequired}
    />
  );
};
