import { useContext } from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';

import {
  ConnectedForm,
  ConnectedFormGroup,
  ConnectedFormGroupProps,
  ConnectedFormProps,
  FormPropsContext,
} from '.';
import { SubmitContextProps } from './SubmitButton';
import { ConnectedField } from './types';

interface ConnectedGroupStrictProps<Values extends {}> {
  <Name extends keyof Values, Component extends ConnectedField>(
    props: {
      name: Name;
    } & ConnectedFormGroupProps<Component>
  ): ReturnType<typeof ConnectedFormGroup>;
}

interface UseConnectedFormProps<
  Values,
  Rules extends { [Key in keyof Values]?: RegisterOptions }
> {
  defaultValues: Values;
  validationRules: Partial<Rules>;
}

interface ConnectedFormStrictProps<Values, Rules>
  extends UseConnectedFormProps<Values, Rules> {
  (
    props: UseConnectedFormProps<Values, Rules> & ConnectedFormProps<Values>
  ): ReturnType<typeof ConnectedForm>;
}

export const useConnectedForm = <
  Values,
  ValidationRules extends { [K in keyof Values]: RegisterOptions }
>({
  defaultValues,
  validationRules,
}: UseConnectedFormProps<Values, ValidationRules>) => {
  return useMemo(
    () => ({
      ConnectedFormGroup: ConnectedFormGroup as ConnectedGroupStrictProps<Values>,
      ConnectedForm: ConnectedForm as ConnectedFormStrictProps<
        Values,
        ValidationRules
      >,
      connectedFormProps: {
        defaultValues,
        validationRules,
      },
    }),
    []
  );
};

export const submitSuccessStatus = (
  wasSubmitSuccessful: boolean | undefined,
  isSubmitSuccessful: boolean | undefined
) => {
  return (
    (wasSubmitSuccessful || wasSubmitSuccessful === undefined) &&
    isSubmitSuccessful
  );
};

export const useFormState = () => {
  // This is fixed in a later react-hook-form version:
  // https://github.com/react-hook-form/react-hook-form/issues/2887
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {
    control,
    register,
    errors,
    setValue,
    formState,
    watch,
  } = useFormContext();

  const {
    disableFieldsOnSubmit,
    wasSubmitSuccessful,
    validationRules,
  } = useContext(FormPropsContext);

  const isSubmitSuccessful = submitSuccessStatus(
    wasSubmitSuccessful,
    formState.isSubmitSuccessful
  );

  return {
    control,
    errors,
    isDisabled:
      (formState.isSubmitting || isSubmitSuccessful) && disableFieldsOnSubmit,
    register,
    setValue,
    validationRules,
    watch,
  };
};

export const useField = (fieldName: string) => {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {
    control,
    errors,
    isDisabled,
    register,
    setValue,
    validationRules,
  } = useFormState();

  const error = errors[fieldName]?.message;
  const validation =
    (validationRules &&
      validationRules[fieldName as keyof typeof validationRules]) ??
    undefined;

  return {
    control,
    error,
    isDisabled,
    /**
     * Keep track of the first error in this form.
     * This is so we only add the correct aria-live props on the first error.
     */
    isFirstError: Object.keys(errors)[0] === fieldName,
    validation,
    register,
    setValue,
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
