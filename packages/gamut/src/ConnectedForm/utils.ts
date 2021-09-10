import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';

import { FormPropsContext } from './FormWrapper';
import { SubmitContextProps } from './SubmitButton';

export const submitSuccessStatus = (
  wasSubmitSuccessful: boolean | undefined,
  isSubmitSuccessful: boolean | undefined
) => {
  return (
    (wasSubmitSuccessful || wasSubmitSuccessful === undefined) &&
    isSubmitSuccessful
  );
};

export const useFieldContext = (fieldName: string) => {
  // This is fixed in a later react-hook-form version:
  // https://github.com/react-hook-form/react-hook-form/issues/2887
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { control, register, errors, setValue, formState } = useFormContext();
  const { disableFieldsOnSubmit, wasSubmitSuccessful } = useContext(
    FormPropsContext
  );

  const error = errors[fieldName]?.message;

  const isSubmitSuccessful = submitSuccessStatus(
    wasSubmitSuccessful,
    formState.isSubmitSuccessful
  );

  return {
    /**
     * Keep track of the first error in this form.
     * This is so we only add the correct aria-live props on the first error.
     */
    isFirstError: Object.keys(errors)[0] === fieldName,
    error,
    isDisabled:
      (formState.isSubmitting || isSubmitSuccessful) && disableFieldsOnSubmit,
    register,
    setValue,
    control,
  };
};

export const useSubmitState = ({ loading, disabled }: SubmitContextProps) => {
  const { formState } = useFormContext();

  const isLoading =
    typeof loading === 'function' ? loading(formState) : loading;

  const isDisabled =
    typeof disabled === 'function' ? disabled(formState) : disabled;

  return { isLoading, isDisabled };
};
