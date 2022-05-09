import React from 'react';
import { UseFormReturn } from 'react-hook-form';

import { useFormState } from '../../..';
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
  const { onChange, ...rest } = {
    ...register(field.name, {
      ...field.validation,
    }),
  };

  const { clearErrors } = useFormState();

  return (
    <TextArea
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
      onInput={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (event.target.value.length <= 1) clearErrors(field.name);
      }}
      placeholder={field.placeholder}
    />
  );
};
