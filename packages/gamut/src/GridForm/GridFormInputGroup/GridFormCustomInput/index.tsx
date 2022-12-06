import * as React from 'react';
import { UseFormReturn } from 'react-hook-form';

import { GridFormCustomField, GridFormCustomGroupField } from '../../types';

export type GridFormCustomInputProps = {
  className?: string;
  error?: string;
  field: GridFormCustomField | GridFormCustomGroupField;
  register: UseFormReturn['register'];
  setValue: UseFormReturn['setValue'];
};

export const GridFormCustomInput: React.FC<GridFormCustomInputProps> = ({
  className,
  error,
  field,
  register,
  setValue,
}) => {
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
