import React from 'react';
import { FormContextValues } from 'react-hook-form';

import { Input } from '../../../Form';
import { GridFormTextField } from '../../types';

export type GridFormTextInputProps = {
  className?: string;
  error?: boolean;
  field: Omit<GridFormTextField, 'label'>;
  setValue: (value: string) => void;
  register: FormContextValues['register'];
};

export const GridFormTextInput: React.FC<GridFormTextInputProps> = ({
  className,
  error,
  field,
  register,
  setValue,
}) => {
  const onChange = (event: any) => {
    setValue(event.target.value);
  };
  return (
    <Input
      className={className}
      error={error}
      htmlFor={field.name}
      name={field.name}
      onChange={onChange}
      ref={register(field.validation)}
      type={field.type}
    />
  );
};

export default GridFormTextInput;
