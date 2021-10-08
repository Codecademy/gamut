import React from 'react';

import { ConnectedRadio, ConnectedRadioGroup } from '../../..';
import { ConnectedRadioGroupInputProps } from '../types';

export const ConnectedRadioGroupInput: React.FC<ConnectedRadioGroupInputProps> = ({
  disabled,
  name,
  options,
  validation,
  ...rest
}) => {
  return (
    <ConnectedRadioGroup name={name} {...rest}>
      {options.map((elem) => {
        return (
          <ConnectedRadio
            name={name}
            validation={validation}
            disabled={disabled}
            {...elem}
          />
        );
      })}
    </ConnectedRadioGroup>
  );
};
