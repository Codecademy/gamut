import { Checkbox, FormGroup } from '@codecademy/gamut';
import React, { ChangeEvent, useState } from 'react';

type CustomCheckboxProps = {
  defaultChecked?: boolean;
  errorMessage?: string;
  disabled?: boolean;
};

export const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  defaultChecked = false,
  errorMessage,
  disabled,
}) => {
  const [currentChecked, setCurrentChecked] = useState(defaultChecked);

  const changeHandler = (event: ChangeEvent<HTMLElement>) => {
    setCurrentChecked(!currentChecked);
  };

  return (
    <FormGroup htmlFor="this-checkbox" error={errorMessage} disabled={disabled}>
      <Checkbox
        htmlFor="this-checkbox"
        onChange={changeHandler}
        label="i am a checkbox!"
        disabled={disabled}
        checked={currentChecked}
      />
    </FormGroup>
  );
};
