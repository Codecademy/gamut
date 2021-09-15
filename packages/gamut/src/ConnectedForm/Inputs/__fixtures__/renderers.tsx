import React from 'react';

import { FormValues } from '../../../Form/types';
import { ConnectedForm, ConnectedFormProps } from '../..';

type ConnectedFormInputProps = Pick<
  ConnectedFormProps<FormValues>,
  'validation' | 'onSubmit'
> & {
  Field: React.ReactNode;
};

export const ConnectedFormInput: React.FC<ConnectedFormInputProps> = ({
  Field,
  validation = 'onSubmit',
  onSubmit,
  ...rest
}) => {
  return (
    <ConnectedForm validation={validation} onSubmit={onSubmit} {...rest}>
      {Field}
    </ConnectedForm>
  );
};
