import React from 'react';
import { UseFormMethods } from 'react-hook-form';

import { GridFormCustomField } from '../../types';

export type GridFormCustomInputProps = {
  className?: string;
  error?: string;
  field: GridFormCustomField;
  register: UseFormMethods['register'];
  setValue: UseFormMethods['setValue'];
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
