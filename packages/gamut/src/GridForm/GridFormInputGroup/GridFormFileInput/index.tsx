import React from 'react';
import { FormContextValues } from 'react-hook-form';

import { Input } from '../../../Form';
import { GridFormFileField } from '../../types';

export type GridFormFileInputProps = {
  className?: string;
  error?: boolean;
  field: Omit<GridFormFileField, 'label'>;
  register: FormContextValues['register'];
  id?: string;
};

export const GridFormFileInput: React.FC<GridFormFileInputProps> = ({
  className,
  error,
  field,
  register,
  id,
}) => {
  return (
    <Input
      className={className}
      error={error}
      htmlFor={field.name}
      name={field.name}
      onChange={(event) => field.onUpdate?.(event.target.files)}
      ref={register(field.validation)}
      type="file"
      id={id}
    />
  );
};

export default GridFormFileInput;
