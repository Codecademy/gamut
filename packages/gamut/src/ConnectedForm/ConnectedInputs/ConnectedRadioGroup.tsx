import * as React from 'react';

import { RadioGroup } from '../..';
import { useField } from '..';
import { ConnectedRadioGroupProps } from './types';

export const ConnectedRadioGroup: React.FC<ConnectedRadioGroupProps> = ({
  name,
  onChange,
  customValidations,
  ...rest
}) => {
  const { setValue, isRequired } = useField({ name, customValidations });

  return (
    <RadioGroup
      aria-required={isRequired}
      htmlForPrefix={name}
      name={name}
      role="radiogroup"
      onChange={(event) => {
        const { value } = event.target;
        setValue(name, value);
        onChange?.(event);
      }}
      {...rest}
    />
  );
};
