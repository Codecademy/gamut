import React from 'react';
import { UseFormReturn } from 'react-hook-form';

import { Input } from '../../../Form';
import { BaseFormInputProps, GridFormFileField } from '../../types';

export interface GridFormFileInputProps extends BaseFormInputProps {
  field: Omit<GridFormFileField, 'label'>;
  register: UseFormReturn['register'];
}

export const GridFormFileInput: React.FC<GridFormFileInputProps> = ({
  className,
  disabled,
  error,
  field,
  register,
  required,
}) => {
  return (
    <Input
      {...register(field.name, {
        ...field.validation,
        onChange: (event) => field.onUpdate?.(event.target.files!),
      })}
      aria-invalid={error}
      aria-required={required}
      className={className}
      disabled={disabled}
      error={error}
      htmlFor={field.name}
      id={field.id}
      name={field.name}
      type="file"
    />
  );
};
