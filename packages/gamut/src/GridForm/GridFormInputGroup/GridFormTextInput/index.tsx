import React from 'react';
import { FormContextValues } from 'react-hook-form';

import { Input } from '../../../Form';
import { GridFormTextField } from '../../types';

export type GridFormTextInputProps = {
  className?: string;
  field: Omit<GridFormTextField, 'label'>;
  register: FormContextValues['register'];
};

export const GridFormTextInput: React.FC<GridFormTextInputProps> = ({
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
      type={field.type}
    />
  );
};

export default GridFormTextInput;
