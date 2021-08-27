import { useContext } from 'react';
import { FieldError, useFormContext } from 'react-hook-form';

import { PropsContext } from '../Form';

PropsContext;
export const useFieldContext = (fieldName: string) => {
  const { register, errors, setValue, formState } = useFormContext();
  const { disableFieldsOnSubmit } = useContext(PropsContext);
  /**
   * Keep track of the first error in this form.
   * This is so we only add the correct aria-live props on the first error.
   */

  return {
    isFirstError: Object.keys(errors)[0] === fieldName,
    error: (errors[fieldName] as FieldError)?.message,
    isDisabled: formState.isSubmitting && disableFieldsOnSubmit,
    register,
    setValue,
  };
};
