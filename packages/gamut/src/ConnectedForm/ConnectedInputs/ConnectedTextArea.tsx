import * as React from 'react';

import { TextArea } from '../..';
import { useField } from '..';
import { ConnectedTextAreaProps } from './types';

export const ConnectedTextArea: React.FC<ConnectedTextAreaProps> = ({
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
    <TextArea
      aria-required={isRequired}
      disabled={isDisabled}
      error={Boolean(error)}
      {...ref}
      {...rest}
    />
  );
};
