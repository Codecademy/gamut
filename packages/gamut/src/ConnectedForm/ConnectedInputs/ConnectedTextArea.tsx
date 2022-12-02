import * as React from 'react';

import { TextArea } from '../..';
import { useField } from '..';
import { ConnectedTextAreaProps } from './types';

export const ConnectedTextArea: React.FC<ConnectedTextAreaProps> = ({
  disabled,
  name,
  ...rest
}) => {
  const { error, isDisabled, ref, isRequired } = useField({
    name,
    disabled,
  });

  return (
    <TextArea
      disabled={isDisabled}
      error={error}
      aria-required={isRequired}
      {...ref}
      {...rest}
    />
  );
};
