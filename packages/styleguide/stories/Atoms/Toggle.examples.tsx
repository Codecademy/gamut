import { Toggle } from '@codecademy/gamut';
import React, { useState } from 'react';

export const InteractiveInputToggle: React.FC = () => {
  const [checked, setChecked] = useState(false);
  const changeHandler = () => {
    setChecked(!checked);
  };

  return <Toggle checked={checked} onChange={changeHandler} label="hi" />;
};

export const InteractiveButtonToggle: React.FC = () => {
  const [checked, setChecked] = useState(false);
  const changeHandler = () => {
    setChecked(!checked);
  };

  return (
    <Toggle as="button" checked={checked} onClick={changeHandler} label="hi2" />
  );
};
