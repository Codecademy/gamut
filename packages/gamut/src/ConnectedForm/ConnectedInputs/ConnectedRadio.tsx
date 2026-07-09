import * as React from 'react';

import { Radio } from '../..';
import { useField } from '..';
import { ConnectedRadioProps } from './types';

export const ConnectedRadio: React.FC<ConnectedRadioProps> = ({
  disabled,
  name,
  customValidations,
  ...rest
}) => {
  const { error, isDisabled, ref } = useField({
    name,
    disabled,
    customValidations,
  });

  return (
    <Radio disabled={isDisabled} error={Boolean(error)} {...ref} {...rest} />
  );
};
