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
  setLocalValue: (value: string) => void;
  watchUpdateKeyName?: string;
}

export const useGetInitialFormValue = ({
  name,
  setLocalValue,
  watchUpdateKeyName,
}: GetInitialFormValueProps) => {
  const initializedRef = useRef(false);

  const { getValues, watch } = useFormState();

  /**
   * This ensures that the initialValue can be updated on subsequent re-renders
   * if necessary according to some larger update.
   *
   * For example, imagine a form that gets submitted, but stays on the form page
   * and should display with the "new" data that the user just saved. The form will
   * re-render because we re-populate it with the response data from our successful POST
   * but the original memoized value would appear instead of the "new" initial value.
   *
   * This key allows us to watch something like "updatedAt"
   * so that the initialValue will be re-synced when some larger context
   * about our form changes.
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
      setLocalValue(initialValue);
    }
  }, [initialValue, setLocalValue]);
};

/**
 * @remarks
 * This fn is used to solve a purely UX issue rather than a functional one:
 * Imagine a user who begins typing in an input but notices that the
 * dirty state on the form hasn't changed (maybe a "Save" button doesn't light up).
 * Because we're actually only updating our form onBlur, the dirty state of the form
 * won't change until onBlur occurs as well, but that's counter-intuitive to users.
 *
 * This fn dirties the form as soon as they begin typing
 * (by being called as part of the onChange fn of the input) by
 * setting the value to some non-key ('') to a non-undefined / non-null state.
 *
 * This is very hacky, but in our testing we couldn't find any problems with it.
 */
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

interface DebouncedFieldProps
  extends GetInitialFormValueProps,
    Pick<useFieldProps, 'loading' | 'disabled' | 'name'> {}

export function useDebouncedField<
  T extends HTMLInputElement | HTMLTextAreaElement
>({ name, watchUpdateKeyName, disabled, loading }: DebouncedFieldProps) {
  const useFieldPayload = useField({ name, disabled, loading });

  // START - Specific to useDebouncedField - START
  const [localValue, setLocalValue] = useState('');

  useGetInitialFormValue({
    name,
    setLocalValue,
    watchUpdateKeyName,
  });

  const setFormDirty = useMakeSetFormDirty();

  const onChange: ChangeEventHandler<T> = (e) => {
    setLocalValue(e.target.value);
    setFormDirty();
  };
  const onBlur = () => useFieldPayload.setValue(name, localValue);
  // END - Specific to useDebouncedField - END

  // Fields we might want to not include: register, setValue (from form)
  return {
    ...useFieldPayload,
    onBlur,
    onChange,
    value: localValue,
  };
}
