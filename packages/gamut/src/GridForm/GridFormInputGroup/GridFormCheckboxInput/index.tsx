import * as React from 'react';
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
  error,
}) => {
  return (
    <Controller
      defaultValue={Boolean(field.defaultValue)}
      name={field.name}
      render={({ field: { value, onBlur, onChange, name } }) => (
        <Checkbox
          aria-invalid={error}
          aria-required={required}
          checked={value}
          className={className}
          disabled={disabled}
          htmlFor={name}
          id={field.id}
          label={field.description}
          multiline={field.multiline}
          name={name}
          spacing={field?.spacing}
          onBlur={onBlur}
          onChange={(event) => {
            field.onUpdate?.(event.target.checked);
            onChange?.(event.target.checked);
          }}
        />
      )}
      rules={field.validation}
    />
  );
};
