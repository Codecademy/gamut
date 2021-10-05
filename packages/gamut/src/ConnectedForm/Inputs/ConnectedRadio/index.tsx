import React from 'react';

import { Radio } from '../../../Form';
import { useFieldContext } from '../../utils';
import { ConnectedRadioProps } from '../types';

export const ConnectedRadio: React.FC<ConnectedRadioProps> = ({
  disabled,
  name,
  ...rest
}) => {
  const { isDisabled, register, validation, error } = useFieldContext(name);
  const currentlyDisabled = isDisabled || disabled;

  return (
    <Radio
      disabled={currentlyDisabled}
      error={error}
      name={name}
      ref={register(validation)}
      {...rest}
    />
  );
};
