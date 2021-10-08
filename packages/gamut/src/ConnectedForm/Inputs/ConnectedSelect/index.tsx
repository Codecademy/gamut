import React from 'react';

import { Select } from '../../../Form';
import { useField } from '../../utils';
import { ConnectedSelectProps } from '../types';

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
