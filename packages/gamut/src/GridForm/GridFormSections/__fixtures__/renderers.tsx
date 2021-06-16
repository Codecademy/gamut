import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { GridFormContent, GridFormContentProps } from '../GridFormContent';

type GridFormContentTestComponentProps = GridFormContentProps & {
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
