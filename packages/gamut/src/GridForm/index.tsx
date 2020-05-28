import React from 'react';
import { useForm, FieldError, Mode } from 'react-hook-form';

import { Form } from '../Form';
import { LayoutGrid, LayoutGridProps } from '../Layout';
import GridFormInputGroup from './GridFormInputGroup';
import GridFormSubmit, { GridFormSubmitProps } from './GridFormSubmit';
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
  onSubmit: (values: Values) => Promise<void>;

  /**
   * Layout grid row gap override.
   */
  rowGap?: LayoutGridProps['rowGap'];

  /**
   * Description of the submit button at the end of the form.
   */
  submit: Omit<GridFormSubmitProps, 'disabled'>;

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
    defaultValues: fields.reduce(
      (defaultValues, field) => ({
        ...defaultValues,
        [field.name]: field.defaultValue,
      }),
      {}
    ),
    mode: validation,
  });

  return (
    <Form className={className} onSubmit={handleSubmit(onSubmit)}>
      <LayoutGrid columnGap={columnGap} rowGap={rowGap}>
        {fields.map((field) => {
          const errorMessage = (errors[field.name] as FieldError)?.message;

          return (
            <GridFormInputGroup
              error={errorMessage as string}
              field={field}
              key={field.name}
              register={register}
              setValue={setValue}
            />
          );
        })}
        <GridFormSubmit
          disabled={validation === 'onChange' && !formState.isValid}
          {...submit}
        />
        {children}
      </LayoutGrid>
    </Form>
  );
}

export default GridForm;
