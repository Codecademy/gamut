import { FieldError, useFormContext, UseFormMethods } from 'react-hook-form';

import { DisableOnSubmit } from '..';

type formContext = UseFormMethods & DisableOnSubmit;

export const useFieldContext = (fieldName: string) => {
  const { register, errors, setValue, formState, disableFieldsOnSubmit } = <
    formContext
  >useFormContext();
  /**
   * Keep track of the first error in this form.
   * This is so we only add the correct aria-live props on the first error.
   */

  return {
    isFirstError: Object.keys(errors)[0] === fieldName,
    error: (errors[fieldName] as FieldError)?.message,
    isDisabled: true && true,
    register,
    setValue,
  };
};
