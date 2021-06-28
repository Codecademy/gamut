import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { GridFormContent, GridFormContentProps } from '../GridFormContent';
import { GridFormSection, GridFormSectionProps } from '../GridFormSection.tsx';

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
  const methods = useForm({
    mode,
  });

  return (
    <FormProvider {...methods}>
      <GridFormContent
        field={field}
        showRequired={showRequired}
        key={field.name}
      />
    </FormProvider>
  );
};

export const GridFormSectionTestComponent: React.FC<GridFormSectionTestComponentProps> = ({
  fields,
  showRequired,
  mode = 'onSubmit',
}) => {
  const methods = useForm({
    mode,
  });

  return (
    <FormProvider {...methods}>
      <GridFormSection fields={fields} showRequired={showRequired} />
    </FormProvider>
  );
};
