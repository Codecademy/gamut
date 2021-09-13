import React from 'react';

import { FormValues } from '../../../Form/types';
import { FormWrapper, FormWrapperProps } from '../..';

type ConnectedFormInputProps = Pick<
  FormWrapperProps<FormValues>,
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
    <FormWrapper validation={validation} onSubmit={onSubmit} {...rest}>
      {Field}
    </FormWrapper>
  );
};
