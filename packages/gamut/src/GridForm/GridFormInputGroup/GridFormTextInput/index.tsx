import React from 'react';
import { UseFormReturn } from 'react-hook-form';

import { Input } from '../../../Form';
import { BaseFormInputProps, GridFormTextField } from '../../types';

export interface GridFormTextInputProps extends BaseFormInputProps {
  field: Omit<GridFormTextField, 'label'>;
  register: UseFormReturn['register'];
  setOnBlur: () => void;
  setOnFocus: () => void;
}

export const GridFormTextInput: React.FC<GridFormTextInputProps> = ({
  className,
  error,
  field,
  register,
  required,
  disabled,
  setOnBlur,
  setOnFocus,
}) => {
  const { onChange, onBlur, ...rest } = {
    ...register(field.name, {
      ...field.validation,
    }),
  };

  return (
    <Input
      {...rest}
      onFocus={() => {
        setOnFocus();
      }}
      onBlur={async (e) => {
        await onBlur(e);
        if (error) setOnBlur();
      }}
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
      placeholder={field.placeholder}
      type={field.type}
    />
  );
};
