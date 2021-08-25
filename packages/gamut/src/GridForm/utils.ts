import { FieldError, useFormContext, UseFormMethods } from 'react-hook-form';

import { DisableOnSubmit } from '..';

type formContext = UseFormMethods & DisableOnSubmit;

export const useIsFieldDisabled = (disabled: boolean) => {
  const { formState, disableFieldsOnSubmit } = <formContext>useFormContext();
  return (formState.isSubmitting && disableFieldsOnSubmit) || disabled;
};

export const useFieldContext = (fieldName: string) => {
  const { register, errors, setValue } = useFormContext();
  /**
   * Keep track of the first error in this form.
   * This is so we only add the correct aria-live props on the first error.
   */

  return {
    isFirstError: Object.keys(errors)[0] === fieldName,
    error: (errors[fieldName] as FieldError)?.message,
    register,
    setValue,
  };
};
