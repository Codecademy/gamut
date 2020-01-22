import { Input } from '@codecademy/gamut';
import React from 'react';

import { GridFormTextField } from '../../types';

export type GridFormTextInputProps = {
  field: Omit<GridFormTextField, 'label'>;
  setValue: (value: string) => void;
};

const GridFormTextInput: React.FC<GridFormTextInputProps> = ({
  field,
  setValue,
}) => {
  return (
    <Input
      htmlFor={field.name}
      onChange={event => setValue(event.target.value)}
      type={field.type}
    />
  );
};

export default GridFormTextInput;
