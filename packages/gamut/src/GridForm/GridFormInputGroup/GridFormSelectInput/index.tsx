import React from 'react';
import { FormContextValues } from 'react-hook-form';

import { Select } from '../../../Form';
import { GridFormSelectField } from '../../types';

export type GridFormSelectInputProps = {
  className?: string;
  error?: boolean;
  field: Omit<GridFormSelectField, 'label'>;
  register: FormContextValues['register'];
};

export const GridFormSelectInput: React.FC<GridFormSelectInputProps> = ({
  className,
  error,
  field,
  register,
}) => {
  return (
    <Select
      defaultValue={field.defaultValue}
      className={className}
      error={error}
      htmlFor={field.name}
      name={field.name}
      onChange={(event) => field.onUpdate?.(event.target.value)}
      ref={register(field.validation)}
      options={field.options}
      id={field.id}
    />
  );
};

export default GridFormSelectInput;
