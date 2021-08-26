import styled from '@emotion/styled';
import React from 'react';
import {
  FormProvider,
  FormProviderProps,
  Mode,
  SubmitHandler,
  useForm,
} from 'react-hook-form';

import { Form } from '../Form';
import { FormProps } from './Form';
import { FormValues } from './types';

export type DisableOnSubmit = {
  /**
   * If fields should be disabled while form is being submitted and after successful submission.
   */
  disableFieldsOnSubmit?: boolean;
};

export type FormWrapperProps<Values extends {}> = DisableOnSubmit &
  Omit<FormProps, 'onSubmit'> & {
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

export type FormProviderCustomProps = FormProviderProps & DisableOnSubmit;

const PropsContext = React.createContext({ disableFieldsOnSubmit: false });
const PropsProvider = PropsContext.Provider;
/**
 * This is an in progress API! please reach out to the web-plat team if you're interested in using it.
 */
export function FormWrapper<Values extends FormValues>({
  children,
  onSubmit,
  defaultValues,
  validation = 'onSubmit',
  disableFieldsOnSubmit = false,
  ...rest
}: FormWrapperProps<Values>) {
  const { handleSubmit, formState, ...methods } = useForm({
    defaultValues,
    mode: validation,
  });

  return (
    <PropsProvider value={{ disableFieldsOnSubmit }}>
      <FormProvider
        handleSubmit={handleSubmit}
        formState={formState}
        {...methods}
      >
        <Form onSubmit={handleSubmit(onSubmit)} noValidate {...rest}>
          {children}
        </Form>
      </FormProvider>
    </PropsProvider>
  );
}
