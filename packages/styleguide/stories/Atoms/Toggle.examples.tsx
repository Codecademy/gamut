import { Toggle } from '@codecademy/gamut';
import { useState } from 'react';
import * as React from 'react';

export const InteractiveInputToggle: React.FC = () => {
  const [checked, setChecked] = useState(false);
  const changeHandler = () => {
    setChecked(!checked);
  };

  return (
    <Toggle
      checked={checked}
      onChange={changeHandler}
      label="interactive input toggle"
    />
  );
};

export const InteractiveButtonToggle: React.FC = () => {
  const [checked, setChecked] = useState(false);
  const changeHandler = () => {
    setChecked(!checked);
  };

  return (
    <Toggle
      as="button"
      checked={checked}
      onClick={changeHandler}
      label="interactive button toggle"
    />
  );
};
