import * as React from 'react';

import { Input } from '../..';
import { useField } from '..';
import { ConnectedInputProps } from './types';

export const ConnectedInput: React.FC<ConnectedInputProps> = ({
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
    <Input
      aria-required={isRequired}
      disabled={isDisabled}
      error={Boolean(error)}
      {...ref}
      {...rest}
    />
  );
};
