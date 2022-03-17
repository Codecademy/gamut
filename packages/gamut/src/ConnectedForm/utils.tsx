import { useContext, useMemo } from 'react';
import {
  RegisterOptions,
  useFieldArray,
  useFormContext,
} from 'react-hook-form';

import {
  ConnectedForm,
  ConnectedFormGroup,
  ConnectedFormGroupProps,
  ConnectedFormProps,
  FormPropsContext,
} from '.';
import { ConnectedField, SubmitContextProps } from './types';

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
  watchedFields?: {
    fields: (keyof Values)[];
    watchHandler: (arg0: (keyof Values)[]) => void;
  };
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
  watchedFields,
}: UseConnectedFormProps<Values, Partial<ValidationRules>>) => {
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
        watchedFields,
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    formState,
    getValues,
    register,
    reset,
    setError,
    setValue,
    watch,
  } = useFormContext();

  const {
    disableFieldsOnSubmit,
    showRequired,
    validationRules,
    wasSubmitSuccessful,
  } = useContext(FormPropsContext);

  const { isSubmitting, isDirty, errors } = formState;
  const isSubmitSuccessful = submitSuccessStatus(
    wasSubmitSuccessful,
    formState.isSubmitSuccessful
  );

  return {
    control,
    errors,
    formState,
    getValues,
    isDirty,
    isDisabled: (isSubmitting || isSubmitSuccessful) && disableFieldsOnSubmit,
    register,
    reset,
    setError,
    setValue,
    showRequired,
    useFieldArray,
    validationRules,
    watch,
  };
};

interface useFieldProps extends SubmitContextProps {
  name: string;
}

export const useField = ({ name, disabled, loading }: useFieldProps) => {
  // This is fixed in a later react-hook-form version:
  // https://github.com/react-hook-form/react-hook-form/issues/2887
  // eslint-disable-next-line @typescript-eslint/unbound-method
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {
    control,
    errors,
    register,
    isDisabled: formStateDisabled,
    setError,
    setValue,
    showRequired,
    validationRules,
  } = useFormState();

  const error = errors[name]?.message;

  const { isDisabled, isLoading } = useSubmitState({
    disabled: disabled || formStateDisabled,
    loading,
  });

  const validation =
    (validationRules &&
      validationRules[name as keyof typeof validationRules]) ??
    undefined;

  const ref = register(name, validation);

  return {
    control,
    error,
    isDisabled,
    /**
     * Keep track of the first error in this form.
     * This is so we only add the correct aria-live props on the first error.
     */
    isFirstError: Object.keys(errors)[0] === name,
    isLoading,
    isRequired: !!validation?.required,
    register,
    validation,
    ref,
    setValue,
    setError,
    showRequired,
  };
};

export const useSubmitState = ({ loading, disabled }: SubmitContextProps) => {
  const { formState } = useFormContext();

  const isLoading =
    typeof loading === 'function' ? loading(formState) : loading;

  const isDisabled =
    typeof disabled === 'function'
      ? disabled(formState)
      : disabled === undefined
      ? formState.isValid
      : disabled;

  return { isLoading, isDisabled };
};
