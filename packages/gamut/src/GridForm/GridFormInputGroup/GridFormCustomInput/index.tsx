import React, { useEffect } from 'react';
import { FormContextValues } from 'react-hook-form';

import { GridFormCustomField } from '../../types';

export type GridFormCustomInputProps = {
  className?: string;
  error?: string;
  field: GridFormCustomField;
  register: FormContextValues['register'];
  setValue: (name: string, value: any) => void;
};

export const GridFormCustomInput: React.FC<GridFormCustomInputProps> = ({
  className,
  error,
  field,
  register,
  setValue,
}) => {
  useEffect(() => {
    register(field.name, field.validation);
  }, [field.name, field.validation, register]);

  return (
    <>
      {field.render({
        className,
        error,
        field,
        register,
        setValue: (value) => setValue(field.name, value),
      })}
    </>
  );
};

export default GridFormCustomInput;
