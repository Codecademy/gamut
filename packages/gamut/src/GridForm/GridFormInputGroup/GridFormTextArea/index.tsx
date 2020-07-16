import React from 'react';
import { UseFormMethods } from 'react-hook-form';

import { TextArea } from '../../../Form';
import { GridFormTextAreaField } from '../../types';

export type GridFormTextAreaProps = {
  className?: string;
  error?: boolean;
  field: Omit<GridFormTextAreaField, 'label'>;
  register: UseFormMethods['register'];
};

export const GridFormTextArea: React.FC<GridFormTextAreaProps> = ({
  className,
  error,
  field,
  register,
}) => {
  return (
    <TextArea
      className={className}
      error={error}
      htmlFor={field.name}
      name={field.name}
      onChange={(event) => field.onUpdate?.(event.target.value)}
      ref={register(field.validation)}
      id={field.id}
      required={field.validation && !!field.validation.required}
    />
  );
};

export default GridFormTextArea;
