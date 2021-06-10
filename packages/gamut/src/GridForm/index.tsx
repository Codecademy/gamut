import React from 'react';
import { FormProvider, Mode, SubmitHandler, useForm } from 'react-hook-form';

import { TextButtonProps } from '../Button';
import { Form } from '../Form';
import { LayoutGrid, LayoutGridProps } from '../Layout';
import { GridFormButtons, GridFormSubmitProps } from './GridFormButtons';
import {
  GridFormSection,
  GridFormSectionBreak,
  GridFormSectionTitle,
} from './GridFormSection';
import { GridFormField, GridFormSectionType } from './types';

export * from './types';

const defaultColumnGap = {
  _: 8,
  sm: 32,
} as const;

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
  fields?: GridFormField[] | GridFormSectionType[];

  /**
   * Renders a cancel button with the provided child text and onClick function.
   */
  cancel?: TextButtonProps;

  /**
   * Function called with field values on submit, if all validations have passed.
   */
  onSubmit: SubmitHandler<Values>;

  /**
   * Show asterisks next to required fields.
   */
  showRequired?: boolean;

  /**
   * Layout grid row gap override between fields.
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
  Values extends Record<string, boolean | string | undefined | FileList>
>({
  cancel,
  children,
  className,
  columnGap = defaultColumnGap,
  fields = [],
  onSubmit,
  rowGap = 16,
  submit,
  validation = 'onSubmit',
  showRequired = false,
}: GridFormProps<Values>) {
  const hasSections = Boolean(fields[0]?.fields);

  const flatFields = hasSections
    ? fields.flatMap((field) => field.fields)
    : fields;

  const { handleSubmit, formState, ...methods } = useForm({
    defaultValues: flatFields.reduce<any>(
      (defaultValues, field) => ({
        ...defaultValues,
        [field.name]: field.defaultValue,
      }),
      {}
    ),
  });

  /**
   * Keep track of the first error in this form.
   * This is so we only add the correct aria-live props on the first error.
   */
  let pastFirstError = false;

  return (
    <FormProvider
      handleSubmit={handleSubmit}
      formState={formState}
      {...methods}
    >
      <Form className={className} onSubmit={handleSubmit(onSubmit)} noValidate>
        <LayoutGrid columnGap={columnGap} rowGap={rowGap}>
          {hasSections ? (
            <>
              {fields.map((field, index) => {
                return (
                  <>
                    <GridFormSectionTitle {...field.title} />
                    <GridFormSection
                      fields={field.fields}
                      showRequired={showRequired}
                      pastFirstError={pastFirstError}
                    />
                    <GridFormSectionBreak />
                  </>
                );
              })}
            </>
          ) : (
            <GridFormSection
              fields={fields}
              showRequired={showRequired}
              pastFirstError={pastFirstError}
            />
          )}
          <GridFormButtons
            cancel={cancel}
            {...submit}
            disabled={
              (validation === 'onChange' && !formState.isValid) ||
              submit.disabled
            }
          />
          {children}
        </LayoutGrid>
      </Form>
    </FormProvider>
  );
}
