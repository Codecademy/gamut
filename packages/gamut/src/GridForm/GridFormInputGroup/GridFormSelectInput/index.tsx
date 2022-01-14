import React from 'react';
import { UseFormReturn } from 'react-hook-form';

import { Select } from '../../../Form';
import { BaseFormInputProps, GridFormSelectField } from '../../types';

export interface GridFormSelectInputProps extends BaseFormInputProps {
  field: Omit<GridFormSelectField, 'label'>;
  register: UseFormReturn['register'];
}

export const GridFormSelectInput: React.FC<GridFormSelectInputProps> = ({
  className,
  disabled,
  error,
  field,
  register,
  required,
}) => {
  return (
    <Select
      {...register(field.name, {
        ...field.validation,
        onChange: (event) => field.onUpdate?.(event.target.value),
      })}
      defaultValue={field.defaultValue}
      disabled={disabled}
      className={className}
      error={error}
      htmlFor={field.name}
      options={field.options}
      id={field.id}
      aria-invalid={error}
      aria-required={required}
    />
  );
};
