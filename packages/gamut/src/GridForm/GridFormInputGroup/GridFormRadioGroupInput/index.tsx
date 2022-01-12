import { isString } from 'lodash';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';

import { Radio, RadioGroup } from '../../../Form';
import { BaseFormInputProps, GridFormRadioGroupField } from '../../types';

export interface GridFormRadioGroupInputProps extends BaseFormInputProps {
  field: GridFormRadioGroupField;
  register: UseFormReturn['register'];
  setValue: (name: string, value: string) => void;
}

export const GridFormRadioGroupInput: React.FC<GridFormRadioGroupInputProps> = ({
  className,
  disabled,
  field,
  register,
  setValue,
  required,
  error,
}) => {
  const ariaLabel: string | undefined =
    field.ariaLabel ?? (isString(field.label) ? field.label : undefined);

  return (
    <RadioGroup
      className={className}
      htmlForPrefix={field.name}
      name={field.name}
      role="radiogroup"
      aria-label={ariaLabel}
      aria-required={required}
      onChange={(event) => {
        const { value } = event.target;
        setValue(field.name, value);
        field.onUpdate?.(value);
      }}
    >
      {field.options.map(({ label, value }) => (
        <Radio
          disabled={disabled}
          key={value}
          label={label}
          ref={...register(field.validation)}
          value={value}
          id={field.id}
          error={error}
        />
      ))}
    </RadioGroup>
  );
};
