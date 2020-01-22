import { FormError, FormGroup, FormGroupLabel } from '@codecademy/gamut';
import React from 'react';

import { GridFormField } from '../types';
import GridFormTextInput from './GridFormTextInput';
import GridFormSelectInput from './GridFormSelectInput';

export type GridFormInputGroupProps = {
  error?: string;
  field: GridFormField;
  setValue: (value: string) => void;
};

const GridFormInputGroup: React.FC<GridFormInputGroupProps> = ({
  error,
  field,
  setValue,
}) => {
  const input =
    field.type === 'select' ? (
      <GridFormSelectInput field={field} setValue={setValue} />
    ) : (
      <GridFormTextInput field={field} setValue={setValue} />
    );

  return (
    <FormGroup>
      {error && <FormError>{error}</FormError>}
      <FormGroupLabel>{field.label}</FormGroupLabel>
      {input}
    </FormGroup>
  );
};

export default GridFormInputGroup;
