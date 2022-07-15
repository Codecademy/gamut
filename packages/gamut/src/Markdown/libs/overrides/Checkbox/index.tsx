import React, { HTMLAttributes, useState } from 'react';

import { Checkbox } from '../../../../Form';
import { HTMLToReactNode } from '..';

export interface MarkdownCheckboxProps
  extends HTMLAttributes<HTMLInputElement> {}

/**
 * Details element
 * By default, the <summary> element is not required, but the default "details" text is not easily styled
 * This ensures we always have a summary element to style.
 */

export const MarkdownCheckbox: React.FC<MarkdownCheckboxProps> = ({
  ...props
}) => {
  console.log(props);
  const [currentChecked, setCurrentChecked] = useState(false);

  const changeHandler = () => {
    setCurrentChecked(!currentChecked);
  };

  return (
    <Checkbox
      checked={currentChecked}
      onChange={changeHandler}
      htmlFor="updog"
      label="a checkbox"
    />
  );
};
