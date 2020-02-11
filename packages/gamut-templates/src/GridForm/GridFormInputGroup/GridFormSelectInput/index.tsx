import { Select } from '@codecademy/gamut';
import React from 'react';

import { GridFormSelectField } from '../../types';

export type GridFormSelectInputProps = {
  className?: string;
  field: Omit<GridFormSelectField, 'label'>;
  setValue: (value: string) => void;
};

const GridFormSelectInput: React.FC<GridFormSelectInputProps> = ({
  className,
  field,
  setValue,
}) => {
  return (
    <Select
      className={className}
      htmlFor={field.name}
      onChange={event => setValue(event.target.value)}
      options={field.options}
    />
  );
};

export default GridFormSelectInput;
