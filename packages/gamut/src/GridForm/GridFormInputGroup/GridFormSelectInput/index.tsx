import React from 'react';
import { FormContextValues } from 'react-hook-form';

import { Select } from '../../../Form';
import { GridFormSelectField } from '../../types';

export type GridFormSelectInputProps = {
  className?: string;
  field: Omit<GridFormSelectField, 'label'>;
  register: FormContextValues['register'];
};

export const GridFormSelectInput: React.FC<GridFormSelectInputProps> = ({
  className,
  field,
  register,
}) => {
  return (
    <Select
      defaultValue={field.defaultValue}
      className={className}
      htmlFor={field.name}
      name={field.name}
      ref={register()}
      options={field.options}
    />
  );
};

export default GridFormSelectInput;
