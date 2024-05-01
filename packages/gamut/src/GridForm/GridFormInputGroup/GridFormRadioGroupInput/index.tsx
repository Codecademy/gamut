import isString from 'lodash/isString';
import * as React from 'react';
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
      aria-invalid={error}
      aria-label={ariaLabel}
      aria-required={required}
      className={className}
      htmlForPrefix={field.name}
      name={field.name}
      onChange={(event) => {
        const { value } = event.target;
        setValue(field.name, value);
        field.onUpdate?.(value);
      }}
      role="radiogroup"
    >
      {field.options.map(({ label, value }) => (
        <Radio
          {...register(field.name, field.validation)}
          disabled={disabled}
          key={value}
          label={label}
          value={value}
          id={field.id}
          error={error}
        />
      ))}
    </RadioGroup>
  );
};
