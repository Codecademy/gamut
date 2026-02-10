import { forwardRef, useEffect, useMemo } from 'react';
import * as React from 'react';
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
import { FormProps } from '../Form/elements/Form';
import { FormValues } from '../Form/types';
import { submitSuccessStatus } from './utils';

export interface FormContextProps {
  /**
   * If fields should be disabled while form is being submitted and after successful submission.
   */
  disableFieldsOnSubmit?: boolean;
  /**
   * Solo fields should always be required and have no optional/required text
   */
  isSoloField?: boolean;
  /**
   * If fields should be reset after successful submission.
   */
  resetOnSubmit?: boolean;
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
      defaultValues,
      disableFieldsOnSubmit = false,
      isSoloField,
      onError,
      onSubmit,
      resetOnSubmit = false,
      validation = 'onChange',
      validationRules,
      wasSubmitSuccessful = undefined,
      watchedFields,
      ...rest
    }: ConnectedFormProps<Values>,
    ref: React.ForwardedRef<HTMLFormElement | null>
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

    if (watchedFields) {
      // we're pretty exhaustively type-checking the props as they're passed in, so its fine to cast here.
      const fields = watch(watchedFields.fields);
      watchedFields.watchHandler(fields as any);
    }

    useEffect(() => {
      if (isSubmitSuccessful && resetOnSubmit) {
        reset(defaultValues);
      }
    }, [isSubmitSuccessful, resetOnSubmit, reset, defaultValues]);

    const contextValues = useMemo(() => {
      return {
        disableFieldsOnSubmit,
        isSoloField,
        resetOnSubmit,
        validationRules,
        wasSubmitSuccessful,
      };
    }, [
      disableFieldsOnSubmit,
      isSoloField,
      resetOnSubmit,
      validationRules,
      wasSubmitSuccessful,
    ]);

    return (
      <PropsProvider value={contextValues}>
        <FormProvider
          clearErrors={clearErrors}
          formState={formState}
          handleSubmit={handleSubmit}
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
) as {
  <Values extends FormValues<Values>>(
    props: ConnectedFormProps<Values> &
      React.RefAttributes<HTMLFormElement | null>
  ): React.ReactNode;
};
