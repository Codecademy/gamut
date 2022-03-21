import { Toggle } from '@codecademy/gamut';
import React, { useState } from 'react';

export const InteractiveToggle = () => {
  const [checked, setChecked] = useState(false);
  return <Toggle checked={checked} onChange={() => setChecked(!checked)} />;
};
