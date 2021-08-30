import { useContext, useEffect } from 'react';
import { FieldError, useFormContext } from 'react-hook-form';

import { FormPropsContext } from '../Form';
import { GridFormField } from './types';

export const useFieldContext = (field: GridFormField) => {
  const {
    register,
    errors,
    setValue,
    formState,
    setError,
    clearError,
  } = useFormContext();
  const { disableFieldsOnSubmit } = useContext(FormPropsContext);

  const currentError = (errors[field.name] as FieldError)?.message;

  useEffect(() => {
    if (field.customError && !currentError) {
      setError(field.name, {
        type: 'manual',
        message: field.customError,
      });
    } else if (!field.customError && currentError?.type === 'manual') {
      clearError(field.name);
    }
  }, [currentError, field.customError, field.name, setError]);

  return {
    /**
     * Keep track of the first error in this form.
     * This is so we only add the correct aria-live props on the first error.
     */
    isFirstError: Object.keys(errors)[0] === field.name,
    error: currentError,
    isDisabled:
      (formState.isSubmitting || formState.isSubmitSuccessful) &&
      disableFieldsOnSubmit,
    register,
    setValue,
  };
};
