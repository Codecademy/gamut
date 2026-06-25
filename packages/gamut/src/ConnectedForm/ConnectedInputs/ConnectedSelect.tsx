import * as React from 'react';

import { Select } from '../..';
import { useField } from '..';
import { ConnectedSelectProps } from './types';

export const ConnectedSelect: React.FC<ConnectedSelectProps> = ({
  disabled,
  name,
  customValidations,
  ...rest
}) => {
  const { error, isDisabled, ref, isRequired } = useField({
    name,
    disabled,
    customValidations,
  });

  return (
    <Select
      aria-required={isRequired}
      disabled={isDisabled}
      error={Boolean(error)}
      {...ref}
      {...rest}
    />
  );
};
