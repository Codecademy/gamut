import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';

import { FormPropsContext } from '../Form';
import { GridFormField } from './types';

export const useFieldContext = (field: GridFormField) => {
  // This is fixed in a later react-hook-form version:
  // https://github.com/react-hook-form/react-hook-form/issues/2887
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { register, errors, setValue, formState } = useFormContext();
  const { disableFieldsOnSubmit, wasSubmitSuccessful } = useContext(
    FormPropsContext
  );

  const error = errors[field.name]?.message;

  const isSubmitSuccessful =
    (wasSubmitSuccessful || wasSubmitSuccessful === undefined) &&
    formState.isSubmitSuccessful;

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
