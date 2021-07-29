import { states } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React, { Fragment } from 'react';
import { FormProvider, Mode, SubmitHandler, useForm } from 'react-hook-form';

import { ButtonProps } from '../Button/shared';
import { Form } from '../Form';
import { LayoutGrid, LayoutGridProps } from '../Layout';
import { GridFormButtons, GridFormSubmitProps } from './GridFormButtons';
import {
  GridFormContent,
  GridFormSection,
  GridFormSectionBreak,
  GridFormSectionTitle,
} from './GridFormSections';
import {
  GridFormField,
  GridFormFieldsProps,
  GridFormSectionProps,
} from './types';

export * from './types';

const defaultColumnGap = {
  _: 8,
  sm: 32,
} as const;

const isGridFormSection = (
  field: GridFormField | GridFormSectionProps
): field is GridFormSectionProps => {
  return (field as GridFormSectionProps).title !== undefined;
};

const StyledLayoutGrid = styled(LayoutGrid)(
  states({
    columnFlow: {
      gridTemplateColumns: 'initial',
      gridTemplateRows: 'repeat(12, minmax(max-content, .5fr))',
      gridAutoFlow: 'column',
    },
  })
);

export type GridFormProps<Values extends {}> = {
  children?: React.ReactNode;
  className?: string;

  /**
   * Layout grid column gap override.
   */
  columnGap?: LayoutGridProps['columnGap'];

  /**
   * Descriptions of any fields or sections comprising the form.
   */
  fields?: GridFormFieldsProps[];

  /**
   * Renders a cancel button with the provided child text and onClick function.
   */
  cancel?: ButtonProps;

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

  columnFlow?: boolean;
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
  columnFlow,
}: GridFormProps<Values>) {
  const flatFields = fields.flatMap((field) =>
    isGridFormSection(field) ? field.fields : field
  );

  const { handleSubmit, formState, ...methods } = useForm({
    defaultValues: flatFields.reduce<any>(
      (defaultValues, field) => ({
        ...defaultValues,
        [field.name]: field.defaultValue,
      }),
      {}
    ),
    mode: validation,
  });

  return (
    <FormProvider
      handleSubmit={handleSubmit}
      formState={formState}
      {...methods}
    >
      <Form className={className} onSubmit={handleSubmit(onSubmit)} noValidate>
        <StyledLayoutGrid
          columnGap={columnGap}
          rowGap={rowGap}
          columnFlow={columnFlow}
        >
          <>
            {fields.map((field) => {
              if (isGridFormSection(field)) {
                const { title, as, layout, fields, variant } = field;
                return (
                  <Fragment key={title}>
                    <GridFormSectionTitle
                      title={title}
                      as={as}
                      layout={layout}
                      numberOfFields={fields.length}
                      variant={variant}
                    />
                    <GridFormSection
                      fields={fields}
                      showRequired={showRequired}
                    />
                    {columnFlow ? null : <GridFormSectionBreak />}
                  </Fragment>
                );
              }
              return (
                <GridFormContent
                  field={field}
                  showRequired={showRequired}
                  key={field.name}
                />
              );
            })}
          </>
          {!columnFlow && (
            <GridFormButtons
              cancel={cancel}
              {...submit}
              disabled={
                (validation === 'onChange' && !formState.isValid) ||
                submit.disabled
              }
            />
          )}

          {children}
        </StyledLayoutGrid>
        {columnFlow && (
          <GridFormButtons
            cancel={cancel}
            {...submit}
            disabled={
              (validation === 'onChange' && !formState.isValid) ||
              submit.disabled
            }
          />
        )}
      </Form>
    </FormProvider>
  );
}
