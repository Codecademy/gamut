import { Input } from '@codecademy/gamut';
import React from 'react';
import { FormContextValues } from 'react-hook-form';

import { GridFormTextField } from '../../types';

export type GridFormTextInputProps = {
  className?: string;
  field: Omit<GridFormTextField, 'label'>;
  setValue: (value: string) => void;
  register: FormContextValues['register'];
};

export const GridFormTextInput: React.FC<GridFormTextInputProps> = ({
  className,
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
      htmlFor={field.name}
      name={field.name}
      onChange={onChange}
      ref={register(field.validation)}
      type={field.type}
    />
  );
};

export default GridFormTextInput;
