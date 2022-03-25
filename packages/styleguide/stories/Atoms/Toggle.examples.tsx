import { Toggle, ToggleProps } from '@codecademy/gamut';
import React, { useState } from 'react';

export const InteractiveInputToggle: React.FC<
  Omit<ToggleProps, 'onChange' | 'checked'>
> = ({ ...rest }) => {
  const [checked, setChecked] = useState(false);
  const changeHandler = () => {
    setChecked(!checked);
  };

  return <Toggle checked={checked} onChange={changeHandler} {...rest} />;
};

export const InteractiveButtonToggle: React.FC<
  Omit<ToggleProps, 'onClick' | 'checked' | 'onChange'>
> = ({ ...rest }) => {
  const [checked, setChecked] = useState(false);
  const changeHandler = () => {
    setChecked(!checked);
  };

  return (
    <Toggle as="button" checked={checked} onClick={changeHandler} {...rest} />
  );
};
