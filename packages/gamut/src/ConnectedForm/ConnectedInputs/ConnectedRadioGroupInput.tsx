import * as React from 'react';

import { ConnectedRadio, ConnectedRadioGroup } from '.';
import { ConnectedRadioGroupInputProps } from './types';

export const ConnectedRadioGroupInput: React.FC<
  ConnectedRadioGroupInputProps
> = ({ name, options, disabled, customValidations, ...rest }) => {
  return (
    <ConnectedRadioGroup
      name={name}
      customValidations={customValidations}
      {...rest}
    >
      {options.map((elem) => {
        return (
          <ConnectedRadio
            disabled={disabled}
            key={`${name}-${elem.value}`}
            name={name}
            {...elem}
          />
        );
      })}
    </ConnectedRadioGroup>
  );
};
