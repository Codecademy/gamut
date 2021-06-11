import React from 'react';
import { UseFormMethods } from 'react-hook-form';

import { TextArea } from '../../../Form';
import { GridFormTextAreaField } from '../../types';

export type GridFormTextAreaProps = {
  className?: string;
  clearErrors: UseFormMethods['clearErrors'];
  error?: boolean;
  showRequired?: boolean;
  field: Omit<GridFormTextAreaField, 'label'>;
  register: UseFormMethods['register'];
};

export const GridFormTextArea: React.FC<GridFormTextAreaProps> = ({
  className,
  clearErrors,
  error,
  field,
  register,
  showRequired,
}) => {
  return (
    <TextArea
      className={className}
      disabled={field.disabled}
      error={error}
      htmlFor={field.name}
      name={field.name}
      onChange={(event) => {
        clearErrors(field.name);
        field.onUpdate?.(event.target.value);
      }}
      ref={register(field.validation)}
      id={field.id}
      aria-invalid={error}
      aria-required={showRequired}
      placeholder={field.placeholder}
    />
  );
};
