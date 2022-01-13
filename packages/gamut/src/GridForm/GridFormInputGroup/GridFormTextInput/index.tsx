import React from 'react';
import { UseFormReturn } from 'react-hook-form';

import { Input } from '../../../Form';
import { BaseFormInputProps, GridFormTextField } from '../../types';

export interface GridFormTextInputProps extends BaseFormInputProps {
  field: Omit<GridFormTextField, 'label'>;
  register: UseFormReturn['register'];
}

export const GridFormTextInput: React.FC<GridFormTextInputProps> = ({
  className,
  error,
  field,
  register,
  required,
  disabled,
}) => {
  const { onChange, ...rest } = register(field.name, field.validation);

  return (
    <Input
      {...rest}
      className={className}
      disabled={disabled}
      error={error}
      htmlFor={field.name}
      onChange={async (event) => {
        await onChange(event);
        field.onUpdate?.(event.target.value);
      }}
      placeholder={field.placeholder}
      type={field.type}
      id={field.id}
      aria-invalid={error}
      aria-required={required}
    />
  );
};
