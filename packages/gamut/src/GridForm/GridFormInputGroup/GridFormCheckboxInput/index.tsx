import React from 'react';
import { Controller } from 'react-hook-form';

import { Checkbox } from '../../../Form';
import { BaseFormInputProps, GridFormCheckboxField } from '../../types';

export interface GridFormCheckboxInputProps extends BaseFormInputProps {
  field: GridFormCheckboxField;
}

export const GridFormCheckboxInput: React.FC<GridFormCheckboxInputProps> = ({
  className,
  field,
  required,
  disabled,
}) => {
  return (
    <Controller
      defaultValue={Boolean(field.defaultValue)}
      name={field.name}
      render={({ field: { value, onBlur, onChange, name } }) => (
        <Checkbox
          checked={value}
          className={className}
          disabled={disabled}
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
          aria-required={required}
          spacing={field?.spacing}
        />
      )}
      rules={field.validation}
    />
  );
};
