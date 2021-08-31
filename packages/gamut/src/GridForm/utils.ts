import { useContext, useMemo } from 'react';
import { FieldError, useFormContext } from 'react-hook-form';

import { SubmitContextProps } from '..';
import { FormPropsContext } from '../Form';
import { GridFormField } from './types';

export const useFieldContext = (field: GridFormField) => {
  const { register, errors, setValue, formState } = useFormContext();
  const { disableFieldsOnSubmit } = useContext(FormPropsContext);

  const error = (errors[field.name] as FieldError)?.message;

  return {
    /**
     * Keep track of the first error in this form.
     * This is so we only add the correct aria-live props on the first error.
     */
    isFirstError: Object.keys(errors)[0] === field.name,
    error,
    isDisabled:
      (formState.isSubmitting || formState.isSubmitSuccessful) &&
      disableFieldsOnSubmit,
    register,
    setValue,
  };
};

export const useSubmitContext = ({ loading, disabled }: SubmitContextProps) => {
  const { reset, formState } = useFormContext();
  const { resetOnSubmit } = useContext(FormPropsContext);

  const isLoading =
    typeof loading === 'function' ? loading(formState) : loading;

  const isDisabled =
    typeof disabled === 'function' ? disabled(formState) : disabled;

  useMemo(() => {
    if (formState.isSubmitSuccessful && resetOnSubmit) {
      reset();
    }
  }, [formState.isSubmitSuccessful, resetOnSubmit, reset]);

  return { isLoading, isDisabled };
};
