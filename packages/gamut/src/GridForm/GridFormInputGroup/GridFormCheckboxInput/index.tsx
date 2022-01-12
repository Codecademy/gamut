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
      render={({ field: renderField }) => (
        <Checkbox
          checked={renderField.value}
          className={className}
          disabled={disabled}
          htmlFor={renderField.name}
          name={renderField.name}
          onChange={(event) => {
            field.onUpdate?.(event.target.checked);
            renderField?.onChange?.(event.target.checked);
          }}
          onBlur={renderField.onBlur}
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
