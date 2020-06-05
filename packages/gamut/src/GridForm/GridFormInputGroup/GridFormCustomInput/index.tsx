import React, { useEffect } from 'react';
import { FormContextValues } from 'react-hook-form';

import { GridFormCustomField } from '../../types';

export type GridFormCustomInputProps = {
  className?: string;
  error?: string;
  field: GridFormCustomField;
  register: FormContextValues['register'];
  setValue: (name: string, value: any) => void;
  getValues: (payload?: {
    nest: boolean;
  }) => Record<string, boolean | string | undefined>;
};

export const GridFormCustomInput: React.FC<GridFormCustomInputProps> = ({
  className,
  error,
  field,
  register,
  setValue,
  getValues,
}) => {
  useEffect(() => {
    register(field.name, field.validation);
  }, [field.name, field.validation, register, field.defaultValue, setValue]);

  return (
    <>
      {field.render({
        className,
        error,
        field,
        register,
        setValue: (value) => setValue(field.name, value),
        value: getValues()[field.name],
      })}
    </>
  );
};

export default GridFormCustomInput;
