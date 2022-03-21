import { Toggle, ToggleProps } from '@codecademy/gamut';
import React, { useState } from 'react';

export const InteractiveToggle: React.FC<ToggleProps> = ({
  checked: startingCheckedState,
  onChange,
  ...rest
}) => {
  const [checked, setChecked] = useState(startingCheckedState);
  const changeHandler = () => {
    setChecked(!checked);
    onChange();
  };

  return <Toggle checked={checked} onChange={changeHandler} {...rest} />;
};
