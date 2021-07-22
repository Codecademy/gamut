import React from 'react';
import { Controller, useFormContext, UseFormMethods } from 'react-hook-form';

import { Checkbox } from '../../../Form';
import { GridFormCheckboxField } from '../../types';

export type GridFormCheckboxInputProps = {
  className?: string;
  field: GridFormCheckboxField;
  register: UseFormMethods['register'];
  showRequired?: boolean;
};

export const GridFormCheckboxInput: React.FC<GridFormCheckboxInputProps> = ({
  className,
  field,
  register,
  showRequired,
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      defaultValue={Boolean(field.defaultValue)}
      name={field.name}
      render={({ onChange }) => (
        <>
          <Checkbox
            className={className}
            defaultChecked={field.defaultValue}
            disabled={field.disabled}
            htmlFor={field.name}
            name={field.name}
            onChange={(event) => {
              field.onUpdate?.(event.target.checked);
              onChange?.(event.target.checked);
            }}
            label={field.description}
            multiline={field.multiline}
            ref={register(field.validation)}
            id={field.id}
            aria-required={showRequired}
          />
        </>
      )}
    />
  );
};
