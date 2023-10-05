import * as React from 'react';

import { FormContext } from '../../__fixtures__/helpers';
import { GridFormContent, GridFormContentProps } from '../GridFormContent';
import { GridFormSection, GridFormSectionProps } from '../GridFormSection';

type GridFormContentTestComponentProps = GridFormContentProps & {
  mode?: 'onSubmit' | 'onChange';
};

type GridFormSectionTestComponentProps = GridFormSectionProps & {
  mode?: 'onSubmit' | 'onChange';
};

export const GridFormContentTestComponent: React.FC<GridFormContentTestComponentProps> = ({
  field,
  showRequired,
  mode = 'onSubmit',
}) => {
  return (
    <FormContext mode={mode}>
      <GridFormContent
        field={field}
        showRequired={showRequired}
        key={field.name}
      />
    </FormContext>
  );
};

export const GridFormSectionTestComponent: React.FC<GridFormSectionTestComponentProps> = ({
  fields,
  showRequired,
  mode = 'onSubmit',
}) => {
  return (
    <FormContext mode={mode}>
      <GridFormSection fields={fields} showRequired={showRequired} />
    </FormContext>
  );
};
