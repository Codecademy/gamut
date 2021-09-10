import React from 'react';

import { Input, InputProps } from '../../../Form';
import { useFieldContext } from '../../utils';
import { BaseConnectedInputProps } from '../types';

export type ConnectedInputProps = Omit<InputProps, 'defaultValue' | 'name'> &
  BaseConnectedInputProps;

export const ConnectedInput: React.FC<ConnectedInputProps> = ({
  disabled,
  name,
  validation,
  ...rest
}) => {
  const { isDisabled, register } = useFieldContext(name);
  const currentlyDisabled = isDisabled || disabled;

  return (
    <Input
      disabled={currentlyDisabled}
      name={name}
      ref={register(validation)}
      {...rest}
    />
  );
};
