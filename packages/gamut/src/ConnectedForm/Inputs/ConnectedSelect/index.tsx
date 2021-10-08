import React from 'react';

import { Select } from '../../../Form';
import { useField } from '../../utils';
import { ConnectedSelectProps } from '../types';

export const ConnectedSelect: React.FC<ConnectedSelectProps> = ({
  disabled,
  name,
  ...rest
}) => {
  const { isDisabled, register, validation, error } = useField({
    name,
    disabled,
  });

  return (
    <Select
      disabled={isDisabled}
      error={error}
      name={name}
      ref={register(validation)}
      {...rest}
    />
  );
};
