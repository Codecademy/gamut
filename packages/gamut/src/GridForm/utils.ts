import { useContext, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import { SubmitContextProps } from '..';
import { FormPropsContext } from '../Form';
import { GridFormField } from './types';

const submitSuccessStatus = (
  wasSubmitSuccessful: boolean | undefined,
  isSubmitSuccessful: boolean
) => {
  return (
    (wasSubmitSuccessful || wasSubmitSuccessful === undefined) &&
    isSubmitSuccessful
  );
};

export const useFieldContext = (field: GridFormField) => {
  const { register, errors, setValue, formState } = useFormContext();
  const { disableFieldsOnSubmit, wasSubmitSuccessful } = useContext(
    FormPropsContext
  );

  const error = errors[field.name]?.message;

  const isSubmitSuccessful = submitSuccessStatus(
    wasSubmitSuccessful,
    formState.isSubmitSuccessful
  );

  return {
    /**
     * Keep track of the first error in this form.
     * This is so we only add the correct aria-live props on the first error.
     */
    isFirstError: Object.keys(errors)[0] === field.name,
    error,
    isDisabled:
      (formState.isSubmitting || isSubmitSuccessful) && disableFieldsOnSubmit,
    register,
    setValue,
  };
};

export const useSubmitContext = ({ loading, disabled }: SubmitContextProps) => {
  const { reset, formState } = useFormContext();
  const { resetOnSubmit, wasSubmitSuccessful } = useContext(FormPropsContext);

  const isLoading =
    typeof loading === 'function' ? loading(formState) : loading;

  const isDisabled =
    typeof disabled === 'function' ? disabled(formState) : disabled;

  const isSubmitSuccessful = submitSuccessStatus(
    wasSubmitSuccessful,
    formState.isSubmitSuccessful
  );

  useMemo(() => {
    if (isSubmitSuccessful && resetOnSubmit) {
      reset();
    }
  }, [isSubmitSuccessful, resetOnSubmit, reset]);

  return { isLoading, isDisabled };
};
