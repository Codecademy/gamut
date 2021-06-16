import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { GridFormContent, GridFormContentProps } from '../GridFormContent';

export const GridFormContentTestComponent: React.FC<GridFormContentProps> = ({
  field,
  showRequired,
}) => {
  const methods = useForm();

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
