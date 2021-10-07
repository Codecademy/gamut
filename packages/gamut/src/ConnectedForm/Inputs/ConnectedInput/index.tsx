import React from 'react';

import { Input } from '../../../Form';
import { useField } from '../../utils';
import { ConnectedInputProps } from '../types';

export const ConnectedInput: React.FC<ConnectedInputProps> = ({
  disabled,
  name,
  ...rest
}) => {
  const { error, isDisabled, register, validation } = useField(name);
  const currentlyDisabled = isDisabled || disabled;

  return (
    <Input
      disabled={currentlyDisabled}
      error={error}
      name={name}
      ref={register(validation)}
      {...rest}
    />
  );
};
