import React, { HTMLAttributes, useState } from 'react';

import { Checkbox } from '../../../../Form';

export interface MarkdownCheckboxProps
  extends HTMLAttributes<HTMLInputElement> {
  label?: string;
}

/**
 * Details element
 * By default, the <summary> element is not required, but the default "details" text is not easily styled
 * This ensures we always have a summary element to style.
 */

export const MarkdownCheckbox: React.FC<MarkdownCheckboxProps> = ({
  label,
  ...props
}) => {
  // console.log(props);
  const [currentChecked, setCurrentChecked] = useState(false);

  const changeHandler = () => {
    setCurrentChecked(!currentChecked);
  };

  return (
    <Checkbox
      checked={currentChecked}
      onChange={changeHandler}
      htmlFor={label}
      label={label}
    />
  );
};

// TO DO, FIGURE OUT LI STUFF
// type === 'checkbox' &&
//   node.children &&
//   node.children[0]?.name === 'input' &&
//   node.children[0]?.attribs?.type === type;
