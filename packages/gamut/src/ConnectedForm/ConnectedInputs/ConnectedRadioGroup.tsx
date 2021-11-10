import React from 'react';

import { RadioGroup } from '../..';
import { useField } from '..';
import { ConnectedRadioGroupProps } from './types';

export const ConnectedRadioGroup: React.FC<ConnectedRadioGroupProps> = ({
  name,
  onChange,
  ...rest
}) => {
  const { setValue } = useField({ name });

  return (
    <RadioGroup
      htmlForPrefix={name}
      name={name}
      onChange={(event) => {
        const { value } = event.target;
        setValue(name, value);
        onChange?.(event);
      }}
      {...rest}
    />
  );
};
