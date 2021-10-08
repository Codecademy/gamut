import React from 'react';

import { TextArea } from '../../../Form';
import { useField } from '../../utils';
import { ConnectedTextAreaProps } from '../types';

export const ConnectedTextArea: React.FC<ConnectedTextAreaProps> = ({
  disabled,
  name,
  ...rest
}) => {
  const { isDisabled, register, validation, error } = useField({
    name,
    disabled,
  });

  return (
    <TextArea
      disabled={isDisabled}
      error={error}
      name={name}
      ref={register(validation)}
      {...rest}
    />
  );
};
