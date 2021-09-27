import React, { useContext } from 'react';
import { SubmitHandler, useFormContext } from 'react-hook-form';

import {
  ConnectedField2,
  ConnectedFormGroup3,
  ConnectedFormGroupProps3,
  FormPropsContext,
} from '.';
import { ConnectedFieldProps } from './Inputs/types';
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

interface CassForm<V, R extends { [K in keyof V]: any }> {
  defaultValues: V;
  validation: R;
}

interface CassField2<N> {
  <T extends ConnectedField2>(props: T & { name: N }): JSX.Element;
}

const useCassForms = <
  Values,
  ValidationRules extends { [K in keyof Values]: any }
>({
  defaultValues,
  validation,
}: CassForm<Values, ValidationRules>) => {
  const formOverFunction = ((
    props: React.ComponentProps<typeof ConnectedFormGroup3>
  ) => <ConnectedFormGroup3 {...props} />) as CassField2<keyof Values>;
  return [formOverFunction];
};

//[pass key of validation into the key of ]

// props: { onSubmit: SubmitHandler<Values>; children: React.ReactNode }) => (
//   <ConnectedForm defaultValues={defaultValues} {...props}>
//     {props.children}
//   </ConnectedForm>
// ),
// Make ConnectedForm + ConnectedFormGroup able to accept a generic

export const TestOne = () => {
  const [ConnectedFormGroup3, ConnectedForm] = useCassForms({
    defaultValues: { cool: true, beans: false },
    validation: {
      cool: { required: true },
      beans: {
        required: true,
      },
    },
  });

  return (
    <ConnectedForm onSubmit={({ cool }) => cool}>
      <ConnectedFormGroup3 name="cool" />
      <ConnectedFormGroup3 name="beans" />
    </ConnectedForm>
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
