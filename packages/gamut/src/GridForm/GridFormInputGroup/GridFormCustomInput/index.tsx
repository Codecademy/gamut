import React from 'react';
import { UseFormMethods } from 'react-hook-form';

import { GridFormCustomField, GridFormCustomGroupField } from '../../types';

export type GridFormCustomInputProps = {
  className?: string;
  clearErrors: UseFormMethods['clearErrors'];
  error?: string;
  field: GridFormCustomField | GridFormCustomGroupField;
  register: UseFormMethods['register'];
  setValue: UseFormMethods['setValue'];
};

export const GridFormCustomInput: React.FC<GridFormCustomInputProps> = ({
  className,
  clearErrors,
  error,
  field,
  register,
  setValue,
}) => {
  return (
    <>
      {field.render({
        className,
        clearErrors,
        error,
        field,
        register,
        setValue: (value) => setValue(field.name, value),
      })}
    </>
  );
};
