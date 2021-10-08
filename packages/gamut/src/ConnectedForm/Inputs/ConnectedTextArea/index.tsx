import React from 'react';

import { TextArea } from '../../../Form';
import { useField } from '../../utils';
import { ConnectedTextAreaProps } from '../types';

export const ConnectedTextArea: React.FC<ConnectedTextAreaProps> = ({
  disabled,
  name,
  ...rest
}) => {
  const { error, isDisabled, ref } = useField({
    name,
    disabled,
  });

  return (
    <TextArea
      disabled={isDisabled}
      error={error}
      name={name}
      ref={ref}
      {...rest}
    />
  );
};
