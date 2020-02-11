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

const GridFormTextInput: React.FC<GridFormTextInputProps> = ({
  className,
  field,
  register,
  setValue,
}) => {
  return (
    <Input
      className={className}
      htmlFor={field.name}
      name={field.name}
      onChange={event => setValue(event.target.value)}
      ref={register(field.validation)}
      type={field.type}
    />
  );
};

export default GridFormTextInput;
