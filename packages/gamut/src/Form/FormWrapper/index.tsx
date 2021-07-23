import React from 'react';
import { FormProvider, Mode, SubmitHandler, useForm } from 'react-hook-form';

import { GridFormField } from '../../GridForm/types';
import { Form } from '..';

export type FormWrapperProps<Values extends {}> = {
  children?: React.ReactNode;

  fields?: GridFormField[];

  /**
   * Function called with field values on submit, if all validations have passed.
   */
  onSubmit: SubmitHandler<Values>;

  /**
   * Which react hook form mode we are going to use for validation.
   * If you use the onChange mode the submit button will be disabled until all
   * required fields are completed.
   */
  validation?: Exclude<Mode, 'onBlur'>;
};
export function FormWrapper<
  Values extends Record<string, boolean | string | undefined | FileList>
>({
  children,
  fields = [],
  onSubmit,
  validation = 'onSubmit',
}: FormWrapperProps<Values>) {
  const { handleSubmit, formState, ...methods } = useForm({
    defaultValues: fields.reduce<any>(
      (defaultValues, field) => ({
        ...defaultValues,
        [field.name]: field.defaultValue,
      }),
      {}
    ),
    mode: validation,
  });

  return (
    <FormProvider
      handleSubmit={handleSubmit}
      formState={formState}
      {...methods}
    >
      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        {children}
      </Form>
    </FormProvider>
  );
}
