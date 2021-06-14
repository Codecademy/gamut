import { isString } from 'lodash';
import React from 'react';
import { UseFormMethods } from 'react-hook-form';

import { Radio, RadioGroup } from '../../../Form';
import { GridFormRadioGroupField } from '../../types';

export type GridFormRadioGroupInputProps = {
  className?: string;
  field: GridFormRadioGroupField;
  register: UseFormMethods['register'];
  setValue: (name: string, value: string) => void;
  showRequired?: boolean;
};

export const GridFormRadioGroupInput: React.FC<GridFormRadioGroupInputProps> = ({
  className,
  field,
  register,
  setValue,
  showRequired,
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
      aria-required={showRequired}
      onChange={(event) => {
        const { value } = event.target;
        setValue(field.name, value);
        field.onUpdate?.(value);
      }}
    >
      {field.options.map(({ label, value }) => (
        <Radio
          disabled={field.disabled}
          key={value}
          label={label}
          ref={register(field.validation)}
          value={value}
          id={field.id}
        />
      ))}
    </RadioGroup>
  );
};
