import React from 'react';

import { TextArea } from '../../../Form';
import { useFieldContext } from '../../utils';
import { ConnectedTextAreaProps } from '../types';

export const ConnectedTextArea: React.FC<ConnectedTextAreaProps> = ({
  disabled,
  name,
  ...rest
}) => {
  const { isDisabled, register, validation } = useFieldContext(name);
  const currentlyDisabled = isDisabled || disabled;

  return (
    <TextArea
      disabled={currentlyDisabled}
      name={name}
      ref={register(validation)}
      {...rest}
    />
  );
};
