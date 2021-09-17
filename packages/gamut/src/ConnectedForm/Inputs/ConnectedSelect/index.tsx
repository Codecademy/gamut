import React from 'react';

import { Select } from '../../../Form';
import { useFieldContext } from '../../utils';
import { ConnectedSelectProps } from '../types';

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
