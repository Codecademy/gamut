import React from 'react';
import { UseFormMethods } from 'react-hook-form';

import { Select } from '../../../Form';
import { GridFormSelectField } from '../../types';

export type GridFormSelectInputProps = {
  className?: string;
  error?: boolean;
  showRequired?: boolean;
  field: Omit<GridFormSelectField, 'label'>;
  register: UseFormMethods['register'];
};

export const GridFormSelectInput: React.FC<GridFormSelectInputProps> = ({
  className,
  error,
  field,
  register,
  showRequired,
}) => {
  return (
    <Select
      defaultValue={field.defaultValue}
      disabled={field.disabled}
      className={className}
      error={error}
      htmlFor={field.name}
      name={field.name}
      onChange={(event) => field.onUpdate?.(event.target.value)}
      ref={register(field.validation)}
      options={field.options}
      id={field.id}
      aria-invalid={error}
      aria-required={showRequired}
    />
  );
};
