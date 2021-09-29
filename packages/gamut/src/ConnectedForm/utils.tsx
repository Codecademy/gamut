import React, { useContext } from 'react';
import {
  DeepPartial,
  UnpackNestedValue,
  useFormContext,
} from 'react-hook-form';

import {
  ConnectedForm,
  ConnectedFormGroup,
  ConnectedFormProps,
  ConnectedInput,
  FormPropsContext,
  SubmitButton,
} from '.';
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

export type FormValues<T> = {
  [key in keyof T]?: boolean | string | Pick<FileList, 'item'>;
};

interface CassForm<V, R extends { [K in keyof V]: any }> {
  defaultValues: V;
  validation: R;
}

interface CassField2<N> {
  <T extends React.ComponentProps<typeof ConnectedFormGroup>>(
    props: T & { name: N }
  ): JSX.Element;
}

const useCassForms = <
  Values,
  ValidationRules extends { [K in keyof Values]: any }
>({
  defaultValues,
  validation,
}: CassForm<Values, ValidationRules>) => {
  const ComposedFormGroup = ((
    props: React.ComponentProps<typeof ConnectedFormGroup>
  ) => {
    const { field, ...rest } = props;
    return (
      <ConnectedFormGroup
        {...rest}
        field={{
          validation: { ...validation[rest.name as keyof typeof validation] },
          ...field,
        }}
      />
    );
  }) as CassField2<keyof Values>;

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
    defaultValues: { cool: 'cool', beans: 'beans!' },
    validation: {
      cool: { required: 'explain yourself cool' },
      beans: {
        required: 'explain yourself beans',
      },
    },
  });

  return (
    <ComposedForm m={48} onSubmit={({ cool }) => console.log(cool)}>
      <SubmitButton variant="secondary" m={32}>
        dont forget to submit, okay?
      </SubmitButton>
      <ComposedFormGroup
        name="cool"
        label="cool"
        field={{
          component: ConnectedInput,
        }}
      />
      <ComposedFormGroup
        name="beans"
        label="beans"
        field={{
          component: ConnectedInput,
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
