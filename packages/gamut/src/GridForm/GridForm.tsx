import React, { Fragment } from 'react';
import { Mode, SubmitHandler } from 'react-hook-form';

import { DisableOnSubmit } from '..';
import { ButtonProps } from '../Button/shared';
import { FormWrapper } from '../Form';
import { FormValues } from '../Form/types';
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

export type GridFormProps<Values extends {}> = DisableOnSubmit & {
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
  submit: GridFormSubmitProps;

  /**
   * Which react hook form mode we are going to use for validation.
   * If you use the onChange mode the submit button will be disabled until all
   * required fields are completed.
   */
  validation?: Exclude<Mode, 'onBlur'>;
};

export function GridForm<Values extends FormValues>({
  cancel,
  children,
  columnGap = defaultColumnGap,
  fields = [],
  onSubmit,
  rowGap = 16,
  submit,
  validation = 'onSubmit',
  showRequired = false,
  disableFieldsOnSubmit = false,
}: GridFormProps<Values>) {
  const flatFields = fields.flatMap((field) =>
    isGridFormSection(field) ? field.fields : field
  );

  const defaultValues = flatFields.reduce<any>(
    (defaultValues, field) => ({
      ...defaultValues,
      [field.name]: field.defaultValue,
    }),
    {}
  );

  return (
    <FormWrapper
      onSubmit={onSubmit}
      validation={validation}
      defaultValues={defaultValues}
      disableFieldsOnSubmit
    >
      <LayoutGrid columnGap={columnGap} rowGap={rowGap}>
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
                  <GridFormSectionBreak />
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
        <GridFormButtons cancel={cancel} {...submit} />
        {children}
      </LayoutGrid>
    </FormWrapper>
  );
}
