import React, { useDeferredValue } from 'react';
import { useFormContext, UseFormReturn } from 'react-hook-form';

import { Input } from '../../../Form';
import { BaseFormInputProps, GridFormTextField } from '../../types';

export interface GridFormTextInputProps extends BaseFormInputProps {
  field: Omit<GridFormTextField, 'label'>;
  register: UseFormReturn['register'];
  error?: string;
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

  const { clearErrors, setError } = useFormContext();

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
          // TODO : possbily swap to useDeferredValue
          // without this setTimeout, the error doesn't actually retrigger.
          setTimeout(() => {
            setError(field.name, {
              type: 'custom',
              message: `${error} `,
            });
          }, 1);
        }
      }}
      placeholder={field.placeholder}
      type={field.type}
    />
  );
};
