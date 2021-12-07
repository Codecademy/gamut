import React, { useEffect, useMemo } from 'react';
import {
  FormProvider,
  FormProviderProps,
  Mode,
  RegisterOptions,
  SubmitHandler,
  useForm,
  ,
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
   * Validation rules form fields. Fields with validation rules must have a defaultValue listed in the defaultValue prop.
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
   * Validation rules form fields. Fields with validation rules must have a defaultValue listed in the defaultValue prop.
   */
  validationRules?: { [Key in keyof Values]?: RegisterOptions };

  /**
   * Which react hook form mode we are going to use for validation.
   * If you use the onChange mode the submit button will be disabled until all
   * required fields are completed.
   */
  validation?: Mode;

  /**
   * An object that accepts an array of field names and a watchHandler that accepts a function, to be run onChange, that takes in an object of key/value pairs. The key is the field name and the value is the current value of the watched field.
   */
  watchedFields?: {
    fields: (keyof Values)[];
    watchHandler: (arg0: Partial<Values>) => void;
  };
}

export type FormProviderCustomProps = FormProviderProps & FormContextProps;

export const FormPropsContext = React.createContext<Partial<FormContextProps>>(
  {}
);
const PropsProvider = FormPropsContext.Provider;

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
  watchedFields,
  ...rest
}: ConnectedFormProps<Values>) {
  // the below is fixed in react-hook-form v7: GM-466
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { handleSubmit, formState, reset, watch, ...methods } = useForm({
    defaultValues,
    mode: validation,
  });

  const isSubmitSuccessful = submitSuccessStatus(
    wasSubmitSuccessful,
    formState.isSubmitSuccessful
  );

  useEffect(() => {
    if (watchedFields) {
      // we're pretty exhaustively type-checking the props as they're passed in, so its fine to cast here.
      const fields = watch(watchedFields.fields) as Partial<Values>;
      watchedFields.watchHandler(fields);
    }
  }, [watchedFields, watch]);

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
    showRequired,5
    validationRules,
    wasSubmitSuccessful,
  ]);

  return (
    <PropsProvider value={contextValues}>
      <FormProvider
        handleSubmit={handleSubmit}
        formState={formState}
        reset={reset}
        watch={watch}
        {...methods}
      >
        <Form onSubmit={handleSubmit(onSubmit)} {...rest}>
          {children}
        </Form>
      </FormProvider>
    </PropsProvider>
  );
}
