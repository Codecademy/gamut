import * as React from 'react';

import { Radio } from '../..';
import { useField } from '..';
import { ConnectedRadioProps } from './types';

export const ConnectedRadio: React.FC<ConnectedRadioProps> = ({
  disabled,
  name,
  ...rest
}) => {
  const { error, isDisabled, ref } = useField({
    name,
    disabled,
  });

  return <Radio disabled={isDisabled} error={error} {...ref} {...rest} />;
};
