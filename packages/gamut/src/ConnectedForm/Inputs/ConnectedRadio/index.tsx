import React from 'react';

import { Radio } from '../../../Form';
import { useField } from '../../utils';
import { ConnectedRadioProps } from '../types';

export const ConnectedRadio: React.FC<ConnectedRadioProps> = ({
  disabled,
  name,
  ...rest
}) => {
  const { error, isDisabled, ref } = useField({
    name,
    disabled,
  });

  return (
    <Radio
      disabled={isDisabled}
      error={error}
      name={name}
      ref={ref}
      {...rest}
    />
  );
};
