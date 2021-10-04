import React from 'react';

import { Select } from '../../../Form';
import { useFieldContext } from '../../utils';
import { ConnectedSelectProps } from '../types';

export const ConnectedSelect: React.FC<ConnectedSelectProps> = ({
  disabled,
  name,
  ...rest
}) => {
  const { isDisabled, register, validation } = useFieldContext(name);
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
