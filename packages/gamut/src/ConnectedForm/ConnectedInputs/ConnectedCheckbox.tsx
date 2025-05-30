import * as React from 'react';
import { Controller } from 'react-hook-form';

import { Checkbox } from '../..';
import { useField } from '..';
import { ConnectedCheckboxProps } from './types';

export const ConnectedCheckbox: React.FC<ConnectedCheckboxProps> = ({
  className,
  disabled,
  id,
  label,
  'aria-label': ariaLabel,
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
      control={control}
      defaultValue={false}
      name={name}
      render={({ field: { value, onBlur, onChange, ref } }) => (
        <Checkbox
          aria-label={
            ariaLabel === undefined
              ? typeof label === 'string'
                ? label
                : 'checkbox'
              : ariaLabel
          }
          aria-required={isRequired}
          checked={value}
          className={className}
          disabled={isDisabled}
          htmlFor={name}
          id={id}
          label={label}
          multiline={multiline}
          name={name}
          spacing={spacing}
          onBlur={onBlur}
          onChange={(event) => {
            onUpdate?.(event.target.checked);
            onChange?.(event.target.checked);
          }}
          {...ref}
        />
      )}
      rules={validation}
    />
  );
};
