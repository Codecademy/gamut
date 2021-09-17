import React from 'react';

import { Input } from '../../../Form';
import { useFieldContext } from '../../utils';
import { ConnectedInputProps } from '../types';

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
