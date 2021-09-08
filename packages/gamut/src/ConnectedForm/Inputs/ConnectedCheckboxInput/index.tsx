import React from 'react';
import { Controller } from 'react-hook-form';

import { Checkbox } from '../../../Form';
import { CheckboxProps } from '../../../Form/Inputs';
import { useFieldContext } from '../../utils';
import { BaseConnectedInputProps } from '../types';

export type ConnectedCheckboxProps = Omit<CheckboxProps, 'defaultValue'> &
  BaseConnectedInputProps;

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
  validation,
}) => {
  const { isDisabled } = useFieldContext(name);
  const currentlyDisabled = isDisabled || disabled;

  return (
    <Controller
      name={name}
      render={({ onChange, onBlur, name, value }) => (
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
          aria-required={required}
          spacing={spacing}
        />
      )}
      rules={validation}
    />
  );
};
