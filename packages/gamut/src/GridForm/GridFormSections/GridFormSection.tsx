import * as React from 'react';

import { GridFormField } from '../types';
import { GridFormContent } from './GridFormContent';

export type GridFormSectionProps = {
  fields: GridFormField[];
};

export const GridFormSection: React.FC<GridFormSectionProps> = ({ fields }) => {
  return (
    <>
      {fields.map((field) => {
        return <GridFormContent field={field} key={field.name} />;
      })}
    </>
  );
};
