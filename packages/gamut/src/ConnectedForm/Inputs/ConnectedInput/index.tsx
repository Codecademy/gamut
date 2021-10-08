import React from 'react';

import { Input } from '../../../Form';
import { useField } from '../../utils';
import { ConnectedInputProps } from '../types';

export const ConnectedInput: React.FC<ConnectedInputProps> = ({
  disabled,
  name,
  ...rest
}) => {
  const { error, isDisabled, register, validation } = useField({
    name,
    disabled,
  });

  return (
    <Input
      disabled={isDisabled}
      error={error}
      name={name}
      ref={register(validation)}
      {...rest}
    />
  );
};
