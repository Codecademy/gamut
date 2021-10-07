import React from 'react';

import { TextArea } from '../../../Form';
import { useField } from '../../utils';
import { ConnectedTextAreaProps } from '../types';

export const ConnectedTextArea: React.FC<ConnectedTextAreaProps> = ({
  disabled,
  name,
  ...rest
}) => {
  const { isDisabled, register, validation, error } = useField(name);
  const currentlyDisabled = isDisabled || disabled;

  return (
    <TextArea
      disabled={currentlyDisabled}
      error={error}
      name={name}
      ref={register(validation)}
      {...rest}
    />
  );
};
