import React from 'react';
import { Controller } from 'react-hook-form';

import { Checkbox } from '../..';
import { useField } from '..';
import { ConnectedCheckboxProps } from './types';

export const ConnectedCheckbox: React.FC<ConnectedCheckboxProps> = ({
  className,
  disabled,
  id,
  label,
  multiline,
  name,
  onUpdate,
  spacing,
}) => {
  const { isDisabled, control, validation, isRequired } = useField({
    name,
    disabled,
  });

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={false}
      render={({ field }) => (
        <Checkbox
          checked={field.value}
          className={className}
          disabled={isDisabled}
          htmlFor={name}
          name={name}
          onChange={(event) => {
            onUpdate?.(event.target.checked);
            field.onChange?.(event.target.checked);
          }}
          onBlur={field.onBlur}
          label={label}
          multiline={multiline}
          id={id}
          aria-required={isRequired}
          spacing={spacing}
          {...field.ref}
        />
      )}
      rules={validation}
    />
  );
};
