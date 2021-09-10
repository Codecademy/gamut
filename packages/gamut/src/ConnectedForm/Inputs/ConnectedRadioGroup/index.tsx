import React from 'react';

import { RadioGroup, RadioGroupProps } from '../../../Form';
import { useFieldContext } from '../../utils';
import { BaseConnectedInputProps } from '../types';

export type ConnectedRadioGroupProps = Omit<
  RadioGroupProps,
  'defaultValue' | 'name'
> &
  BaseConnectedInputProps;

export const ConnectedRadioGroup: React.FC<ConnectedRadioGroupProps> = ({
  name,
  onChange,
  ...rest
}) => {
  const { setValue } = useFieldContext(name);

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
