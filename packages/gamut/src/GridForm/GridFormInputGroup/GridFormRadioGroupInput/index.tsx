import isString from 'lodash/isString';
import { useId } from 'react';
import * as React from 'react';
import { UseFormReturn } from 'react-hook-form';

import { Radio, RadioGroup } from '../../../Form';
import { createInfoTipProps } from '../../../Tip/InfoTip/utils';
import { BaseFormInputProps, GridFormRadioGroupField } from '../../types';

export interface GridFormRadioGroupInputProps extends BaseFormInputProps {
  field: GridFormRadioGroupField;
  register: UseFormReturn['register'];
  setValue: (name: string, value: string) => void;
}

export const GridFormRadioGroupInput: React.FC<
  GridFormRadioGroupInputProps
> = ({ className, disabled, field, register, setValue, required, error }) => {
  const ariaLabel: string | undefined =
    field.ariaLabel ?? (isString(field.label) ? field.label : undefined);
  const defaultLabelId = useId();

  return (
    <RadioGroup
      aria-invalid={error}
      aria-label={ariaLabel}
      aria-required={required}
      className={className}
      htmlForPrefix={field.name}
      name={field.name}
      role="radiogroup"
      onChange={(event) => {
        const { value } = event.target;
        setValue(field.name, value);
        field.onUpdate?.(value);
      }}
    >
      {field.options.map(({ label, value, infotip, ...rest }) => {
        const optionLabelId = `${defaultLabelId}-${value}`;
        const infotipProps = infotip
          ? createInfoTipProps(infotip, optionLabelId).infotipProps
          : undefined;

        return (
          <Radio
            {...register(field.name, field.validation)}
            disabled={disabled}
            error={error}
            id={field.id}
            infotip={infotipProps}
            key={value}
            label={label}
            value={value}
            {...rest}
          />
        );
      })}
    </RadioGroup>
  );
};
