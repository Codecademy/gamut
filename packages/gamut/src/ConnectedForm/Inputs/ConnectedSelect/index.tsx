import React from 'react';

import { Select, SelectProps } from '../../../Form';
import { useFieldContext } from '../../utils';
import { BaseConnectedInputProps } from '../types';

export type ConnectedSelectProps = Omit<SelectProps, 'defaultValue' | 'name'> &
  BaseConnectedInputProps;

export const ConnectedSelect: React.FC<ConnectedSelectProps> = ({
  disabled,
  name,
  validation,
  ...rest
}) => {
  const { isDisabled, register } = useFieldContext(name);
  const currentlyDisabled = isDisabled || disabled;

  return (
    <Select
      disabled={currentlyDisabled}
      name={name}
      ref={register(validation)}
      {...rest}
    />
  );
};
