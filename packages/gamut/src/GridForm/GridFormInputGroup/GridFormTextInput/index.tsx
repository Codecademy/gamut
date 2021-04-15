import React from 'react';
import { UseFormMethods } from 'react-hook-form';

import { Input } from '../../../Form';
import { GridFormTextField } from '../../types';

export type GridFormTextInputProps = {
  className?: string;
  error?: boolean;
  showRequired?: boolean;
  field: Omit<GridFormTextField, 'label'>;
  register: UseFormMethods['register'];
};

export const GridFormTextInput: React.FC<GridFormTextInputProps> = ({
  className,
  error,
  field,
  register,
  showRequired,
}) => {
  return (
    <Input
      className={className}
      disabled={field.disabled}
      error={error}
      htmlFor={field.name}
      onChange={(event) => field.onUpdate?.(event.target.value)}
      placeholder={field.placeholder}
      name={field.name}
      ref={register(field.validation)}
      type={field.type}
      id={field.id}
      aria-invalid={error}
      aria-required={showRequired}
    />
  );
};
