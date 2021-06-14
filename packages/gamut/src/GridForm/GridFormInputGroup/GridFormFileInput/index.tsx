import React from 'react';
import { UseFormMethods } from 'react-hook-form';

import { Input } from '../../../Form';
import { GridFormFileField } from '../../types';

export type GridFormFileInputProps = {
  className?: string;
  error?: boolean;
  showRequired?: boolean;
  field: Omit<GridFormFileField, 'label'>;
  register: UseFormMethods['register'];
};

export const GridFormFileInput: React.FC<GridFormFileInputProps> = ({
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
      name={field.name}
      onChange={(event) => field.onUpdate?.(event.target.files!)}
      ref={register(field.validation)}
      type="file"
      id={field.id}
      aria-invalid={error}
      aria-required={showRequired}
    />
  );
};
