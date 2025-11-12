import * as React from 'react';

import { Input } from '../..';
import { useField } from '..';
import { ConnectedInputProps } from './types';

export const ConnectedInput: React.FC<ConnectedInputProps> = ({
  disabled,
  name,
  ...rest
}) => {
  const { error, isDisabled, ref, isRequired } = useField({
    name,
    disabled,
  });

  return (
    <Input
      aria-required={isRequired}
      disabled={isDisabled}
      error={Boolean(error)}
      {...ref}
      {...rest}
    />
  );
};
