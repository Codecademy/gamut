import React, { forwardRef, useEffect, useMemo } from 'react';
import {
  FieldValues,
  FormProvider,
  FormProviderProps,
  Mode,
  Path,
  RegisterOptions,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
  UseFormProps,
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
    Omit<FormProps, 'onSubmit' | 'onError'> {
  children?: React.ReactNode;

  /**
   * Function called with field values on submit, if all validations have passed.
   */
  onSubmit: SubmitHandler<Values>;

  /**
   * Function called with field errors on submit, if validations have failed.
   */
  onError?: SubmitErrorHandler<Values>;

  /**
   * Default values are highly recommended for reliable form behavior, particularly resets.
   */
  defaultValues?: UseFormProps<Values>['defaultValues'];

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
    fields: Path<Values>[];
    watchHandler: (arg0: Path<Values>[]) => void;
  };
}

export type FormProviderCustomProps = FormProviderProps & FormContextProps;

export const FormPropsContext = React.createContext<Partial<FormContextProps>>(
  {}
);
const PropsProvider = FormPropsContext.Provider;

export const ConnectedForm = forwardRef(
  <Values extends FormValues<Values>>(
    {
      children,
      onSubmit,
      onError,
      defaultValues,
      validation = 'onChange',
      disableFieldsOnSubmit = false,
      resetOnSubmit = false,
      showRequired = false,
      validationRules,
      wasSubmitSuccessful = undefined,
      watchedFields,
      ...rest
    }: ConnectedFormProps<Values>,
    ref: React.ForwardedRef<HTMLFormElement>
  ) => {
    const {
      clearErrors,
      handleSubmit,
      formState,
      reset,
      trigger,
      watch,
      ...methods
    } = useForm<FieldValues>({
      defaultValues,
      mode: validation,
    });

    const onInvalid: SubmitErrorHandler<Values> = async (errors, event) => {
      onError?.(errors, event);
      clearErrors();
      await trigger();
    };

    const isSubmitSuccessful = submitSuccessStatus(
      wasSubmitSuccessful,
      formState.isSubmitSuccessful
    );

    let f: any = null;

    if (watchedFields) {
      f = watch(watchedFields.fields);
    }

    useEffect(() => {
      if (watchedFields) {
        watchedFields.watchHandler(f);
      }
    }, [f, watchedFields]);

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
          clearErrors={clearErrors}
          handleSubmit={handleSubmit}
          formState={formState}
          reset={reset}
          trigger={trigger}
          watch={watch}
          {...methods}
        >
          <Form
            onSubmit={handleSubmit(onSubmit, onInvalid)}
            {...rest}
            ref={ref}
          >
            {children}
          </Form>
        </FormProvider>
      </PropsProvider>
    );
  }
) as <Values extends FormValues<Values>>(
  props: ConnectedFormProps<Values>,
  ref: React.ForwardedRef<HTMLFormElement>
) => React.ReactElement;
