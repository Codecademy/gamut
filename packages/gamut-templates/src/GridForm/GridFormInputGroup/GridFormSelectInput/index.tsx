import { Select } from '@codecademy/gamut';
import React from 'react';
import { FormContextValues } from 'react-hook-form';

import { GridFormSelectField } from '../../types';

export type GridFormSelectInputProps = {
  className?: string;
  field: Omit<GridFormSelectField, 'label'>;
  register: FormContextValues['register'];
  setValue: (value: string) => void;
};

export const GridFormSelectInput: React.FC<GridFormSelectInputProps> = ({
  className,
  field,
  register,
  setValue,
}) => {
  return (
    <Select
      defaultValue={field.defaultValue}
      className={className}
      htmlFor={field.name}
      name={field.name}
      onChange={event => setValue(event.target.value)}
      ref={register()}
      options={field.options}
    />
  );
};

export default GridFormSelectInput;
