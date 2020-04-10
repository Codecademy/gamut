import React from 'react';
import { FormContextValues } from 'react-hook-form';

import { Input } from '../../../Form';
import { GridFormFileField } from '../../types';

export type GridFormFileInputProps = {
  className?: string;
  field: Omit<GridFormFileField, 'label'>;
  register: FormContextValues['register'];
};

export const GridFormFileInput: React.FC<GridFormFileInputProps> = ({
  className,
  field,
  register,
}) => {
  return (
    <Input
      className={className}
      htmlFor={field.name}
      name={field.name}
      ref={register(field.validation)}
      type="file"
    />
  );
};

export default GridFormFileInput;
