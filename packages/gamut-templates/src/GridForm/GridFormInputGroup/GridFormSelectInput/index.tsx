import { Select } from '@codecademy/gamut';
import React from 'react';

import { GridFormSelectField } from '../../types';

export type GridFormSelectInputProps = {
  field: Omit<GridFormSelectField, 'label'>;
  setValue: (value: string) => void;
};

const GridFormSelectInput: React.FC<GridFormSelectInputProps> = ({
  field,
  setValue,
}) => {
  return (
    <Select
      htmlFor={field.name}
      onChange={event => setValue(event.target.value)}
      options={field.options}
    />
  );
};

export default GridFormSelectInput;
