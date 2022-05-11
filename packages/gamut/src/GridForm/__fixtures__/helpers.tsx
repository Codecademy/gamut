import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

type FormContextProps = { mode?: 'onChange' | 'onSubmit' };

export const FormContext: React.FC<FormContextProps> = ({
  mode = 'onChange',
  children,
}) => {
  const methods = useForm({
    mode,
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
};
