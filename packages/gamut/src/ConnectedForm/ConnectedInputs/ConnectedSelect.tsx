import * as React from 'react';

import { Select } from '../..';
import { useField } from '..';
import { ConnectedSelectProps } from './types';

export const ConnectedSelect: React.FC<ConnectedSelectProps> = ({
  disabled,
  name,
  ...rest
}) => {
  const { error, isDisabled, ref, isRequired } = useField({
    name,
    disabled,
  });

  return (
    <Select
      disabled={isDisabled}
      error={Boolean(error)}
      aria-required={isRequired}
      {...ref}
      {...rest}
    />
  );
};
