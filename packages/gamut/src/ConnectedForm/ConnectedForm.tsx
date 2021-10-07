import React, { useEffect, useMemo } from 'react';
import {
  FormProvider,
  FormProviderProps,
  Mode,
  RegisterOptions,
  SubmitHandler,
  useForm,
  UseFormOptions,
} from 'react-hook-form';

import { Form } from '../Form';
import { FormProps } from '../Form/Form';
import { FormValues } from '../Form/types';
import { submitSuccessStatus } from './utils';

export interface FormContextProps {
  /**
   * If fields should be disabled while form is being submitted and after successful submission.
   */
  disableFieldsOnSubmit?: boolean;
  /**
   * If fields should be reset after successful submission.
   */
  resetOnSubmit?: boolean;
  /**
   * If required field should show asterisks in labels.
   */
  showRequired?: boolean;
  /**
   * Function called with field values on submit, if all validations have passed.
   */
  validationRules?: { string?: RegisterOptions };
  /**
   * Sets if form submission was successful - if `undefined` will fall back to react-hook-forms native formState.isSubmitSuccessful.
   */
  wasSubmitSuccessful?: boolean;
}

export interface ConnectedFormProps<Values extends {}>
  extends Omit<FormContextProps, 'validationRules'>,
    Omit<FormProps, 'onSubmit'> {
  children?: React.ReactNode;

  /**
   * Function called with field values on submit, if all validations have passed.
   */
  onSubmit: SubmitHandler<Values>;

  /**
   * Default values are highly recommended for reliable form behavior, particularly resets.
   */
  defaultValues?: UseFormOptions<Values>['defaultValues'];

  /**
   * Function called with field values on submit, if all validations have passed.
   */
  validationRules?: Partial<{ [Key in keyof Values]?: RegisterOptions }>;

  /**
   * Which react hook form mode we are going to use for validation.
   * If you use the onChange mode the submit button will be disabled until all
   * required fields are completed.
   */
  validation?: Mode;
}

export type FormProviderCustomProps = FormProviderProps & FormContextProps;

export const FormPropsContext = React.createContext<Partial<FormContextProps>>(
  {}
);
const PropsProvider = FormPropsContext.Provider;

/**
 * This is an in progress API! please reach out to the web-plat team if you're interested in using it.
 */
export function ConnectedForm<Values extends FormValues<Values>>({
  children,
  onSubmit,
  defaultValues,
  validation = 'onSubmit',
  disableFieldsOnSubmit = false,
  resetOnSubmit = false,
  showRequired = false,
  validationRules,
  wasSubmitSuccessful = undefined,
  ...rest
}: ConnectedFormProps<Values>) {
  const { handleSubmit, formState, reset, ...methods } = useForm({
    defaultValues,
    mode: validation,
  });

  const isSubmitSuccessful = submitSuccessStatus(
    wasSubmitSuccessful,
    formState.isSubmitSuccessful
  );

  useEffect(() => {
    if (isSubmitSuccessful && resetOnSubmit) {
      reset(defaultValues);
    }
  }, [isSubmitSuccessful, resetOnSubmit, reset, defaultValues]);

  const contextValues = useMemo(() => {
    return {
      disableFieldsOnSubmit,
      resetOnSubmit,
      showRequired,
      validationRules,
      wasSubmitSuccessful,
    };
  }, [
    disableFieldsOnSubmit,
    resetOnSubmit,
    showRequired,
    validationRules,
    wasSubmitSuccessful,
  ]);

  return (
    <PropsProvider value={contextValues}>
      <FormProvider
        handleSubmit={handleSubmit}
        formState={formState}
        reset={reset}
        {...methods}
      >
        <Form onSubmit={handleSubmit(onSubmit)} {...rest}>
          {children}
        </Form>
      </FormProvider>
    </PropsProvider>
  );
}
