import React from 'react';

import { Select } from '../..';
import { useField } from '..';
import { ConnectedSelectProps } from './types';

export const ConnectedSelect: React.FC<ConnectedSelectProps> = ({
  disabled,
  name,
  ...rest
}) => {
  const { error, isDisabled, ref } = useField({
    name,
    disabled,
  });

  return (
    <Select
      disabled={isDisabled}
      error={error}
      name={name}
      ref={ref}
      {...rest}
    />
  );
};
