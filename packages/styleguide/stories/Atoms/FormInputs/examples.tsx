import { Checkbox, FormGroup } from '@codecademy/gamut';
import React, { ChangeEvent, useState } from 'react';

type CustomCheckboxProps = {
  htmlFor: string;
  label: string;
  defaultChecked?: boolean;
  errorMessage?: string;
  disabled?: boolean;
};

export const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  htmlFor,
  label,
  defaultChecked = false,
  errorMessage,
  disabled,
}) => {
  const [currentChecked, setCurrentChecked] = useState(defaultChecked);

  const changeHandler = (event: ChangeEvent<HTMLElement>) => {
    setCurrentChecked(!currentChecked);
  };

  return (
    <FormGroup htmlFor={htmlFor} error={errorMessage} disabled={disabled}>
      <Checkbox
        htmlFor={htmlFor}
        onChange={changeHandler}
        label={label}
        disabled={disabled}
        checked={currentChecked}
      />
    </FormGroup>
  );
};
