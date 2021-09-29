import React, { useContext } from 'react';
import {
  DeepPartial,
  UnpackNestedValue,
  useFormContext,
} from 'react-hook-form';

import { ConnectedSelect } from '..';
import {
  ConnectedCheckbox,
  ConnectedForm,
  ConnectedFormGroup,
  ConnectedFormGroupProps,
  ConnectedFormProps,
  ConnectedInput,
  FormPropsContext,
} from '.';
import { SubmitContextProps } from './SubmitButton';
import { ConnectedField } from './types';

export const submitSuccessStatus = (
  wasSubmitSuccessful: boolean | undefined,
  isSubmitSuccessful: boolean | undefined
) => {
  return (
    (wasSubmitSuccessful || wasSubmitSuccessful === undefined) &&
    isSubmitSuccessful
  );
};

interface CassForm<V, R extends { [K in keyof V]?: any }> {
  defaultValues: V;
  validation: Partial<R>;
}

export const useCassForms = <
  Values,
  ValidationRules extends { [K in keyof Values]: any }
>({
  defaultValues,
  validation,
}: CassForm<Values, ValidationRules>) => {
  function ComposedFormGroup<C extends ConnectedField>(
    props: ConnectedFormGroupProps<C> & { name: keyof Values }
  ) {
    const { field, ...rest } = props;
    return (
      <ConnectedFormGroup
        field={{
          validation: { ...validation[rest.name] },
          ...field,
        }}
        {...rest}
      />
    );
  }

  const ComposedForm = (props: ConnectedFormProps<Values>) => (
    <ConnectedForm
      defaultValues={
        defaultValues as UnpackNestedValue<DeepPartial<typeof defaultValues>>
      }
      {...props}
    />
  );

  return { ComposedFormGroup, ComposedForm };
};

export const TestOne = () => {
  const { ComposedFormGroup, ComposedForm } = useCassForms({
    defaultValues: {
      cool: 'gnbsdlfkjndlskfj',
      beans: 'beans!',
      check: true,
      another: 'hey',
    },
    validation: {
      cool: { required: 'explain yourself cool' },
      beans: {
        required: 'explain yourself beans',
      },
    },
  });

  return (
    <ComposedForm
      m={64}
      p={64}
      onSubmit={({ check }) => console.log(check)}
      resetOnSubmit
    >
      <ComposedFormGroup
        name="cool"
        label="cool"
        field={{
          component: ConnectedInput,
        }}
      />

      <ComposedFormGroup
        name="another"
        label="cool"
        field={{
          component: ConnectedSelect,
          options: ['one', 'hey', 'stop'],
        }}
      />
      <ComposedFormGroup
        name="beans"
        label="beans"
        field={{
          component: ConnectedInput,
        }}
      />
      <ComposedFormGroup
        name="check"
        label="ah yes a check"
        field={{
          component: ConnectedCheckbox,
          label: 'yeeeees',
        }}
      />
    </ComposedForm>
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
  const { disableFieldsOnSubmit, wasSubmitSuccessful } = useContext(
    FormPropsContext
  );

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
    watch,
  };
};

export const useFieldContext = (fieldName: string) => {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { control, errors, isDisabled, register, setValue } = useFormState();

  const error = errors[fieldName]?.message;

  return {
    control,
    error,
    isDisabled,
    /**
     * Keep track of the first error in this form.
     * This is so we only add the correct aria-live props on the first error.
     */
    isFirstError: Object.keys(errors)[0] === fieldName,
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
