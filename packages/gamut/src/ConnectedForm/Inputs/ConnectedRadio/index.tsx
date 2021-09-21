import React from 'react';

import { Radio } from '../../../Form';
import { useFieldContext } from '../../utils';
import { ConnectedRadioProps } from '../types';

export const ConnectedRadio: React.FC<ConnectedRadioProps> = ({
  disabled,
  name,
  validation,
  ...rest
}) => {
  const { isDisabled, register } = useFieldContext(name);
  const currentlyDisabled = isDisabled || disabled;

  return (
    <Radio
      disabled={currentlyDisabled}
      name={name}
      ref={register(validation)}
      {...rest}
    />
  );
};
