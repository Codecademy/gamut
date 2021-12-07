import React from 'react';

import { Select } from '../..';
import { useField } from '..';
import { ConnectedSelectProps } from './types';

export const ConnectedSelect: React.FC<ConnectedSelectProps> = ({
  disabled,
  name,
  ...rest
}) => {
  const { error, isDisabled, registeredProps, isRequired } = useField({
    name,
    disabled,
  });

  return (
    <Select
      disabled={isDisabled}
      error={error}
      aria-required={isRequired}
      {...registeredProps}
      {...rest}
    />
  );
};
