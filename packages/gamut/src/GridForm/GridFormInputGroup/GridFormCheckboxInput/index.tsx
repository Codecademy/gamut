import React from 'react';
import { FormContextValues } from 'react-hook-form';

import { Checkbox } from '../../../Form';
import { GridFormCheckboxField } from '../../types';

export type GridFormCheckboxInputProps = {
  className?: string;
  field: GridFormCheckboxField;
  register: FormContextValues['register'];
  setValue: (value: boolean) => void;
};

export const GridFormCheckboxInput: React.FC<GridFormCheckboxInputProps> = ({
  className,
  field,
  setValue,
  register,
}) => {
  return (
    <Checkbox
      className={className}
      defaultChecked={field.defaultValue}
      htmlFor={field.name}
      name={field.name}
      onChange={event => {
        setValue(event.target.checked);
        field.onUpdate?.(event.target.checked);
      }}
      label={field.description}
      ref={register(field.validation)}
    />
  );
};

export default GridFormCheckboxInput;
