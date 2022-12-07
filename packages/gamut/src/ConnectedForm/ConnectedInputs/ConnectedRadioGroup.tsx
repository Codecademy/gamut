import * as React from 'react';

import { RadioGroup } from '../..';
import { useField } from '..';
import { ConnectedRadioGroupProps } from './types';

export const ConnectedRadioGroup: React.FC<ConnectedRadioGroupProps> = ({
  name,
  onChange,
  ...rest
}) => {
  const { setValue, isRequired } = useField({ name });

  return (
    <RadioGroup
      htmlForPrefix={name}
      name={name}
      aria-required={isRequired}
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
