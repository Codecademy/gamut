import * as React from 'react';

import { ConnectedRadio, ConnectedRadioGroup } from '.';
import { ConnectedRadioGroupInputProps } from './types';

export const ConnectedRadioGroupInput: React.FC<ConnectedRadioGroupInputProps> = ({
  name,
  options,
  disabled,
  ...rest
}) => {
  return (
    <ConnectedRadioGroup name={name} {...rest}>
      {options.map((elem) => {
        return (
          <ConnectedRadio
            name={name}
            key={`${name}-${elem.value}`}
            disabled={disabled}
            {...elem}
          />
        );
      })}
    </ConnectedRadioGroup>
  );
};
