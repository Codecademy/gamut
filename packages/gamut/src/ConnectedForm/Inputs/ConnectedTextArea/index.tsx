import React from 'react';

import { TextArea, TextAreaProps } from '../../../Form';
import { useFieldContext } from '../../utils';
import { ConnectedFieldProps } from '../types';

export type ConnectedTextAreaProps = Omit<
  TextAreaProps,
  'defaultValue' | 'name'
> &
  ConnectedFieldProps;

export const ConnectedTextArea: React.FC<ConnectedTextAreaProps> = ({
  disabled,
  name,
  validation,
  ...rest
}) => {
  const { isDisabled, register } = useFieldContext(name);
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
