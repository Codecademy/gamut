import React from 'react';

import { Radio, RadioProps } from '../../../Form';
import { useFieldContext } from '../../utils';
import { BaseConnectedInputProps } from '../types';

export type ConnectedRadioProps = Omit<RadioProps, 'defaultValue' | 'name'> &
  BaseConnectedInputProps;

export const ConnectedRadio: React.FC<ConnectedRadioProps> = ({
  disabled,
  name,
  validation,
  ...rest
}) => {
  const { isDisabled, register } = useFieldContext(name);
  const currentlyDisabled = isDisabled || disabled;

  return (
    <Radio
      disabled={currentlyDisabled}
      name={name}
      ref={register(validation)}
      {...rest}
    />
  );
};
