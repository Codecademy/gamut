import React from 'react';

import { Radio } from '../..';
import { useField } from '..';
import { ConnectedRadioProps } from './types';

export const ConnectedRadio: React.FC<ConnectedRadioProps> = ({
  disabled,
  name,
  ...rest
}) => {
  const { error, isDisabled, registeredProps } = useField({
    name,
    disabled,
  });

  return (
    <Radio disabled={isDisabled} error={error} {...registeredProps} {...rest} />
  );
};
