import React from 'react';
import { useForm, FieldError, Mode, SubmitHandler } from 'react-hook-form';

import { Form } from '../Form';
import { LayoutGrid, LayoutGridProps } from '../Layout';
import { GridFormInputGroup } from './GridFormInputGroup';
import { GridFormSubmit, GridFormSubmitProps } from './GridFormSubmit';
import { GridFormField } from './types';

export * from './types';

export type GridFormProps<Values extends {}> = {
  children?: React.ReactNode;
  className?: string;

  /**
   * Layout grid column gap override.
   */
  columnGap?: LayoutGridProps['columnGap'];

  /**
   * Descriptions of any fields comprising the form.
   */
  fields?: GridFormField[];

  /**
   * Function called with field values on submit, if all validations have passed.
   */
  onSubmit: SubmitHandler<Values>;

  /**
   * Layout grid row gap override.
   */
  rowGap?: LayoutGridProps['rowGap'];

  /**
   * Description of the submit button at the end of the form.
   */
  submit: GridFormSubmitProps & {
    /**
     * Manually overrides the submit button to be disabled regardless of validation, if true.
     */
    disabled?: boolean;
  };

  /**
   * Which react hook form mode we are going to use for validation.
   * If you use the onChange mode the submit button will be disabled until all
   * required fields are completed.
   */
  validation?: Exclude<Mode, 'onBlur'>;
};

export function GridForm<
  Values extends Record<string, boolean | string | undefined>
>({
  children,
  className,
  columnGap = 'lg',
  fields = [],
  onSubmit,
  rowGap = 'md',
  submit,
  validation = 'onSubmit',
}: GridFormProps<Values>) {
  const { errors, handleSubmit, register, setValue, formState } = useForm<
    Values
  >({
    defaultValues: fields.reduce<any>(
      (defaultValues, field) => ({
        ...defaultValues,
        [field.name]: field.defaultValue,
      }),
      {}
    ),
    mode: validation,
  });

  /**
   * Keep track of the first error in this form.
   * This is so we only add the correct aria-live props on the first error.
   */
  let hasFirstError = false;

  return (
    <Form className={className} onSubmit={handleSubmit(onSubmit)} noValidate>
      <LayoutGrid columnGap={columnGap} rowGap={rowGap}>
        {fields.map((field) => {
          const errorMessage = (errors[field.name] as FieldError)?.message;
          // check if this is our first error
          const isFirstError = !hasFirstError && errorMessage !== undefined;
          // update our first error tracking variable
          hasFirstError = hasFirstError || isFirstError;

          return (
            <GridFormInputGroup
              error={errorMessage as string}
              isFirstError={isFirstError}
              field={field}
              key={field.name}
              register={register}
              setValue={setValue}
            />
          );
        })}
        <GridFormSubmit
          {...submit}
          disabled={
            (validation === 'onChange' && !formState.isValid) || submit.disabled
          }
        />
        {children}
      </LayoutGrid>
    </Form>
  );
}
