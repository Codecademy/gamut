import React from 'react';
import { Controller } from 'react-hook-form';

import { Checkbox } from '../../../Form';
import { useField } from '../../utils';
import { ConnectedCheckboxProps } from '../types';

export const ConnectedCheckbox: React.FC<ConnectedCheckboxProps> = ({
  className,
  disabled,
  id,
  label,
  required,
  multiline,
  name,
  onUpdate,
  spacing,
}) => {
  const { isDisabled, control, validation } = useField(name);
  const currentlyDisabled = isDisabled || disabled;

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={false}
      render={({ onChange, onBlur, name, value, ref }) => (
        <Checkbox
          checked={value}
          className={className}
          disabled={currentlyDisabled}
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
          aria-required={required}
          spacing={spacing}
        />
      )}
      rules={validation}
    />
  );
};
