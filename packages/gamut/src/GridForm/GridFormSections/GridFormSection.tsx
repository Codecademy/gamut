import * as React from 'react';

import { GridFormField } from '../types';
import { GridFormContent } from './GridFormContent';

export type GridFormSectionProps = {
  fields: GridFormField[];
  showRequired: boolean;
};

export const GridFormSection: React.FC<GridFormSectionProps> = ({
  fields,
  showRequired,
}) => {
  return (
    <>
      {fields.map((field) => {
        return (
          <GridFormContent
            field={field}
            showRequired={showRequired}
            key={field.name}
          />
        );
      })}
    </>
  );
};
