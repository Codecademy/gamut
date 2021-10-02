import React, { useContext } from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';

import {
  ConnectedCheckbox,
  ConnectedForm,
  ConnectedFormGroup,
  ConnectedFormGroupProps,
  ConnectedFormProps,
  ConnectedInput,
  ConnectedRadioGroupInput,
  ConnectedSelect,
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

interface ComposedGroupProps<Values extends {}> {
  <Name extends keyof Values, Component extends ConnectedField>(
    props: {
      name: Name;
    } & ConnectedFormGroupProps<Component>
  ): ReturnType<typeof ConnectedFormGroup>;
}

interface UseComposedFormProps<
  Values,
  Rules extends { [Key in keyof Values]?: RegisterOptions }
> {
  defaultValues: Values;
  validationRules: Partial<Rules>;
}

interface ComposedFormProps<Values, Rules>
  extends UseComposedFormProps<Values, Rules> {
  (
    props: UseComposedFormProps<Values, Rules> & ConnectedFormProps<Values>
  ): ReturnType<typeof ConnectedForm>;
}

export const useComposedForm = <
  Values,
  ValidationRules extends { [K in keyof Values]: RegisterOptions }
>({
  defaultValues,
  validationRules,
}: UseComposedFormProps<Values, ValidationRules>) => {
  const ComposedFormGroup = ConnectedFormGroup as ComposedGroupProps<Values>;

  const ComposedForm = ConnectedForm as ComposedFormProps<
    Values,
    ValidationRules
  >;

  const wrapperProps = {
    defaultValues,
    validationRules,
  };

  return { ComposedFormGroup, ComposedForm, wrapperProps };
};

export const TestOne = () => {
  const { ComposedFormGroup, ComposedForm, wrapperProps } = useComposedForm({
    defaultValues: {
      cool: 'gnbsdlfkjndlskfj',
      beans: 'beans!',
      check: true,
      selected: 'not to mention nested',
      tv: 'three',
    },
    validationRules: {
      cool: { required: 'explain yourself cool' },
      beans: {
        pattern: {
          value: /^(?:(?!zero).)*$/,
          message: 'zero to hero',
        },
      },
      selected: {
        pattern: {
          value: /^(?:(?!zero).)*$/,
          message: 'not zero.',
        },
      },
      tv: {
        fbasdhjfb: 'fdsajkf',
      },
    },
  });

  return (
    <ComposedForm
      m={64}
      p={64}
      onSubmit={(values) => console.log(values)}
      resetOnSubmit
      {...wrapperProps}
    >
      <ComposedFormGroup
        name="selected"
        label="cool"
        field={{
          component: ConnectedInput,
        }}
      />
      <ComposedFormGroup
        name="check"
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
      <ComposedFormGroup
        name="selected"
        label="selected or dejected"
        field={{
          component: ConnectedSelect,
          options: [
            'perhaps just disrespected?',
            "but maybe that's expected",
            'zero',
          ],
        }}
      />
      <ComposedFormGroup
        name="tv"
        label="tv on the radio"
        field={{
          component: ConnectedRadioGroupInput,
          options: [
            { label: 'one', value: 'first' },
            { label: 'two', value: 'two' },
            { label: 'three', value: 'three' },
            { label: 'zilch', value: 'zero' },
          ],
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
