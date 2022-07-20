import React, { useState } from 'react';

import { Checkbox, CheckboxProps } from '../../../../Form';

export const MarkdownCheckbox: React.FC<CheckboxProps> = ({
  checked = false,
  label,
  ...props
}) => {
  const sanitizedHtmlFor = typeof label === 'string' ? label : label.toString();

  const [currentChecked, setCurrentChecked] = useState(checked);

  const changeHandler = () => {
    setCurrentChecked(!currentChecked);
  };

  return (
    <Checkbox
      checked={currentChecked}
      htmlFor={sanitizedHtmlFor}
      label={label}
      onChange={changeHandler}
      spacing="tight"
    />
  );
};
