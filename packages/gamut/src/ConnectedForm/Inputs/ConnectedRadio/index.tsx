import React from 'react';

import { Radio } from '../../../Form';
import { useField } from '../../utils';
import { ConnectedRadioProps } from '../types';

export const ConnectedRadio: React.FC<ConnectedRadioProps> = ({
  disabled,
  name,
  ...rest
}) => {
  const { isDisabled, register, validation, error } = useField({
    name,
    disabled,
  });

  return (
    <Radio
      disabled={isDisabled}
      error={error}
      name={name}
      ref={register(validation)}
      {...rest}
    />
  );
};
