import React from 'react';
import { FormProvider, Mode, SubmitHandler, useForm } from 'react-hook-form';

import { Form } from '../Form';
import { FormProps } from './Form';
import { FormValues } from './types';

export type FormWrapperProps<Values extends {}> = Omit<
  FormProps,
  'onSubmit'
> & {
  children?: React.ReactNode;

  /**
   * Function called with field values on submit, if all validations have passed.
   */
  onSubmit: SubmitHandler<Values>;

  defaultValues?: FormValues;

  /**
   * Which react hook form mode we are going to use for validation.
   * If you use the onChange mode the submit button will be disabled until all
   * required fields are completed.
   */
  validation?: Mode;
};

/**
 * This is an in progress API! please reach out to the web-plat team if you're interested in using it.
 */
export function FormWrapper<Values extends FormValues>({
  children,
  onSubmit,
  defaultValues,
  validation = 'onSubmit',
  ...rest
}: FormWrapperProps<Values>) {
  const { handleSubmit, formState, ...methods } = useForm({
    defaultValues,
    mode: validation,
  });

  return (
    <FormProvider
      handleSubmit={handleSubmit}
      formState={formState}
      {...methods}
    >
      <Form onSubmit={handleSubmit(onSubmit)} {...rest}>
        {children}
      </Form>
    </FormProvider>
  );
}
