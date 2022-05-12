import React from 'react';
import { useFormContext, UseFormReturn } from 'react-hook-form';

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
  const { onChange, ...rest } = {
    ...register(field.name, {
      ...field.validation,
    }),
  };

  const { clearErrors } = useFormContext();

  return (
    <Input
      {...rest}
      aria-invalid={error}
      aria-required={required}
      className={className}
      disabled={disabled}
      error={error}
      htmlFor={field.name}
      id={field.id}
      name={field.name}
      onChange={async (event) => {
        field?.onUpdate?.(event.target.value);
        await onChange(event);
      }}
      onFocus={() => {
        if (error) {
          clearErrors(field.name);
        }
      }}
      placeholder={field.placeholder}
      type={field.type}
    />
  );
};
