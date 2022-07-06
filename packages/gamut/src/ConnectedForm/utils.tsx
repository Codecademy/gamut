import {
  ChangeEventHandler,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
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
    clearErrors,
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
    clearErrors,
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

interface GetInitialFormValueProps {
  name: string;
  setValue: (value: string) => void;
  valueFormatter?: (value: string) => string;
  watchUpdateKeyName?: string;
}

export const useGetInitialFormValue = ({
  name,
  setValue,
  valueFormatter,
  watchUpdateKeyName,
}: GetInitialFormValueProps) => {
  const initializedRef = useRef(false);

  const { getValues, watch } = useFormState();

  /**
   * This ensures that the initialValue here gets updated
   * whenever the form is saved or updated in some way.
   * Without this, the "initial" value can persist across updates
   * meaning that after saving, the value of a user's field can revert back
   * to the value it had BEFORE you made updates and saved
   * i.e. from the FIRST initial load.
   */
  const updated = watchUpdateKeyName ? watch(watchUpdateKeyName) : undefined;

  const initialValue: string | null = useMemo(() => getValues(name), [
    name,
    getValues,
    updated,
  ]);

  useEffect(() => {
    if (initialValue && !initializedRef.current) {
      /**
       * We only want this effect to run once, to set an initial value if one exists.
       * If it continues to run, we run into issues with things like old, memoized values
       * replacing user entered values on re-renders
       */
      initializedRef.current = true;
      const formattedVal = valueFormatter
        ? valueFormatter(initialValue)
        : initialValue;
      setValue(formattedVal);
    }
  }, [valueFormatter, initialValue, setValue]);
};

export const useMakeSetFormDirty = () => {
  const hasDirtiedRef = useRef(false);

  const { isDirty, setValue } = useFormState();

  return () => {
    if (!isDirty && !hasDirtiedRef.current) {
      hasDirtiedRef.current = true;
      setValue('', '', { shouldDirty: true });
    }
  };
};

interface SetupDebouncedFieldProps
  extends GetInitialFormValueProps,
    Pick<useFieldProps, 'loading' | 'disabled' | 'name'> {}

export function useSetupDebouncedField<
  T extends HTMLInputElement | HTMLTextAreaElement
>({
  name,
  valueFormatter,
  watchUpdateKeyName,
  disabled,
  loading,
}: SetupDebouncedFieldProps) {
  // TODO: Ask Cass why we re-export some methods from formState
  // that seem like they should not be exported (i.e. register, since we
  // call it ourselves in the fn body)
  // Should we just re-export all of form state and/or spread it in the return?
  const useFieldPayload = useField({ name, disabled, loading });

  // START - Specific to useDebounced - START
  const [value, setValue] = useState('');

  useGetInitialFormValue({
    name,
    setValue,
    valueFormatter,
    watchUpdateKeyName,
  });
  const setFormDirty = useMakeSetFormDirty();

  const onChange: ChangeEventHandler<T> = (e) => {
    setValue(e.target.value);
    setFormDirty();
  };
  const onBlur = () => useFieldPayload.setValue(name, value);
  // END - Specific to useDebounced - END

  return {
    ...useFieldPayload,
    onBlur,
    onChange,
    value,
  };
}
