import React from 'react';
import { UseFormMethods } from 'react-hook-form';

import { Input } from '../../../Form';
import { GridFormTextField } from '../../types';

export type GridFormTextInputProps = {
  className?: string;
  error?: boolean;
  field: Omit<GridFormTextField, 'label'>;
  register: UseFormMethods['register'];
};

export const GridFormTextInput: React.FC<GridFormTextInputProps> = ({
  className,
  error,
  field,
  register,
}) => {
  return (
    <Input
      className={className}
      error={error}
      htmlFor={field.name}
      onChange={(event) => field.onUpdate?.(event.target.value)}
      placeholder={field.placeholder}
      name={field.name}
      ref={register(field.validation)}
      type={field.type}
      id={field.id}
      aria-invalid={error}
    />
  );
};

export default GridFormTextInput;
