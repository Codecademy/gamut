import React, { Fragment } from 'react';
import {
  DeepPartial,
  Mode,
  SubmitHandler,
  UnpackNestedValue,
} from 'react-hook-form';

import { ButtonProps } from '../Button/shared';
import { FormContextProps, FormWrapper } from '../Form';
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
  GridFormSectionBreakTypes,
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

export type GridFormProps<Values extends {}> = FormContextProps & {
  /**
   * If a visual break should be added between sections.
   */
  breakType?: GridFormSectionBreakTypes;

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

export function GridForm<Values extends FormValues<Values>>({
  breakType,
  cancel,
  children,
  columnGap = defaultColumnGap,
  fields = [],
  rowGap = 16,
  submit,
  validation = 'onSubmit',
  showRequired = false,
  ...rest
}: GridFormProps<Values>) {
  const flatFields = fields.flatMap((field) =>
    isGridFormSection(field) ? field.fields : field
  );

  type Defaults = UnpackNestedValue<DeepPartial<Values>>;

  const defaultValues = flatFields.reduce<Defaults>(
    // since our checkbox is a controlled input, it needs to be provided with a default value in order to reset correctly.
    (defaultValues, field) => ({
      ...defaultValues,
      [field.name]:
        field.type === 'checkbox' && field.defaultValue === undefined
          ? false
          : field.defaultValue,
    }),
    {} as Defaults
  );

  return (
    <FormWrapper<Values>
      validation={validation}
      defaultValues={defaultValues}
      display="flex"
      flexDirection="column"
      {...rest}
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
                  <GridFormSectionBreak breakType={breakType} />
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
