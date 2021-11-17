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
      render={({ onChange, onBlur, name, value, ref }) => (
        <Checkbox
          checked={value}
          className={className}
          disabled={isDisabled}
          htmlFor={name}
          name={name}
          onChange={(event) => {
            onUpdate?.(event.target.checked);
            onChange?.(event.target.checked);
          }}
          onBlur={onBlur}
          label={label}
          multiline={multiline}
          id={id}
          ref={ref}
          aria-required={isRequired}
          spacing={spacing}
        />
      )}
      rules={validation}
    />
  );
};
