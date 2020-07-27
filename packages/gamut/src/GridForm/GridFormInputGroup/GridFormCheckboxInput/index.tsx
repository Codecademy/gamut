import React from 'react';
import { UseFormMethods } from 'react-hook-form';

import { Checkbox } from '../../../Form';
import { GridFormCheckboxField } from '../../types';

export type GridFormCheckboxInputProps = {
  className?: string;
  field: GridFormCheckboxField;
  register: UseFormMethods['register'];
};

export const GridFormCheckboxInput: React.FC<GridFormCheckboxInputProps> = ({
  className,
  field,
  register,
}) => {
  return (
    <Checkbox
      className={className}
      defaultChecked={field.defaultValue}
      htmlFor={field.name}
      name={field.name}
      onChange={(event) => field.onUpdate?.(event.target.checked)}
      label={field.description}
      multiline={field.multiline}
      ref={register(field.validation)}
      id={field.id}
    />
  );
};

export default GridFormCheckboxInput;
