import React from 'react';
import { Controller, useFormContext, UseFormMethods } from 'react-hook-form';

import { Checkbox } from '../../../Form';
import { GridFormCheckboxField } from '../../types';

export type GridFormCheckboxInputProps = {
  className?: string;
  field: GridFormCheckboxField;
  register: UseFormMethods['register'];
  showRequired?: boolean;
};

export const GridFormCheckboxInput: React.FC<GridFormCheckboxInputProps> = ({
  className,
  field,
  register,
  showRequired,
}) => {
  return (
    <Controller
      name={field.name}
      render={({ onChange, onBlur, name, value }) => (
        <Checkbox
          checked={value}
          className={className}
          disabled={field.disabled}
          htmlFor={name}
          name={name}
          onChange={(event) => {
            field.onUpdate?.(event.target.checked);
            onChange?.(event.target.checked);
          }}
          onBlur={onBlur}
          label={field.description}
          multiline={field.multiline}
          id={field.id}
          aria-required={showRequired}
        />
      )}
      rules={field.validation}
    />
  );
};
