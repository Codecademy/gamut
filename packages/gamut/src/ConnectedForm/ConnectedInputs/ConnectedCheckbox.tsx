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
      name={name}
      control={control}
      defaultValue={false}
      render={({ field: { value, onBlur, onChange, ref } }) => (
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
          aria-label={
            ariaLabel === undefined
              ? typeof label === 'string'
                ? label
                : 'checkbox'
              : ariaLabel
          }
          multiline={multiline}
          id={id}
          aria-required={isRequired}
          spacing={spacing}
          {...ref}
        />
      )}
      rules={validation}
    />
  );
};
