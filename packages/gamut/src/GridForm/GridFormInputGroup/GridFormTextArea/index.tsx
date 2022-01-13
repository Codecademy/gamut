import React from 'react';
import { UseFormReturn } from 'react-hook-form';

import { TextArea } from '../../../Form';
import { BaseFormInputProps, GridFormTextAreaField } from '../../types';

export interface GridFormTextAreaProps extends BaseFormInputProps {
  field: Omit<GridFormTextAreaField, 'label'>;
  register: UseFormReturn['register'];
}

export const GridFormTextArea: React.FC<GridFormTextAreaProps> = ({
  className,
  disabled,
  error,
  field,
  register,
  required,
}) => {
  const { onChange, ...rest } = register(field.name, field.validation);

  return (
    <TextArea
      {...rest}
      className={className}
      disabled={disabled}
      error={error}
      htmlFor={field.name}
      onChange={async (event) => {
        await onChange(event);
        field.onUpdate?.(event.target.value);
      }}
      id={field.id}
      aria-invalid={error}
      aria-required={required}
      placeholder={field.placeholder}
    />
  );
};
