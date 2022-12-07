import { useState } from 'react';
import * as React from 'react';

import { InputStepper, InputStepperProps } from '..';

export const ControlledStepperTest: React.FC<InputStepperProps> = ({
  value,
  ...rest
}) => {
  const [currentValue, setCurrentValue] = useState(value);

  return (
    <InputStepper
      value={currentValue}
      {...rest}
      onChange={(num) => {
        setCurrentValue(num);
      }}
    />
  );
};
