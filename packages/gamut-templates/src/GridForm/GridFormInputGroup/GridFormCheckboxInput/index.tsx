import { Checkbox } from '@codecademy/gamut';
import React from 'react';

import { GridFormCheckboxField } from '../../types';

export type GridFormCheckboxInputProps = {
  className?: string;
  field: GridFormCheckboxField;
  setValue: (value: boolean) => void;
};

export const GridFormCheckboxInput: React.FC<GridFormCheckboxInputProps> = ({
  className,
  field,
  setValue,
}) => {
  return (
    <Checkbox
      className={className}
      defaultChecked={field.defaultValue}
      htmlFor={field.name}
      label={field.description}
      onChange={event => setValue(event.target.checked)}
    />
  );
};

export default GridFormCheckboxInput;
