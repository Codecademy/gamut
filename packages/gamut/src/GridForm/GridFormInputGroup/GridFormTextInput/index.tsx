import * as React from 'react';
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
  const { onChange, ...rest } = {
    ...register(field.name, {
      ...field.validation,
    }),
  };
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
      placeholder={field.placeholder}
      type={field.type}
      onChange={async (event) => {
        field?.onUpdate?.(event.target.value);
        await onChange(event);
      }}
    />
  );
};
