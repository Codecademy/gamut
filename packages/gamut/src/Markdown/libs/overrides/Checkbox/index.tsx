import { useState } from 'react';
import * as React from 'react';

import { Checkbox, CheckboxProps } from '../../../../Form';

export type MarkdownCheckboxProps = Pick<CheckboxProps, 'checked'> & {
  label: string;
};

export const MarkdownCheckbox: React.FC<MarkdownCheckboxProps> = ({
  checked = false,
  label,
}) => {
  const [currentChecked, setCurrentChecked] = useState(checked);

  const changeHandler = () => {
    setCurrentChecked(!currentChecked);
  };

  return (
    <Checkbox
      checked={currentChecked}
      data-testid="gamut-md-checkbox"
      htmlFor={label}
      label={label}
      spacing="tight"
      onChange={changeHandler}
    />
  );
};
