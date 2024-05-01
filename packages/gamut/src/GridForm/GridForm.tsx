import { Fragment } from 'react';
import * as React from 'react';
import {
  DeepPartial,
  Mode,
  SubmitHandler,
  UnpackNestedValue,
} from 'react-hook-form';

import { ButtonProps } from '../Button';
import { ConnectedForm, FormContextProps } from '../ConnectedForm';
import { FormRequiredText } from '../Form';
import { FormValues } from '../Form/types';
import { Column, LayoutGrid, LayoutGridProps } from '../Layout';
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
import { assignDefaultValue } from './utils';

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
   * Whether to hide 'required' explanation at the start of forms - can be disabled only for forms without a required field.
   */
  hideRequiredText?: boolean;

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
  cancel,
  children,
  columnGap = defaultColumnGap,
  fields = [],
  rowGap = 16,
  submit,
  validation = 'onSubmit',
  hideRequiredText,
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
        field.defaultValue === undefined
          ? assignDefaultValue(field)
          : field.defaultValue,
    }),
    {} as Defaults
  );

  return (
    <ConnectedForm<Values>
      validation={validation}
      defaultValues={defaultValues}
      display="flex"
      flexDirection="column"
      {...rest}
    >
      <LayoutGrid columnGap={columnGap} rowGap={rowGap}>
        <>
          {!hideRequiredText && !isGridFormSection(fields[0]) && (
            <Column size={12}>
              <FormRequiredText />
            </Column>
          )}
          {fields.map((field, index) => {
            const numSections = fields.length;
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
                    showRequired={index === 0 && !hideRequiredText}
                  />
                  <GridFormSection fields={fields} />
                  {/* don't show break on last section */}
                  {index + 1 === numSections ? null : <GridFormSectionBreak />}
                </Fragment>
              );
            }
            return <GridFormContent field={field} key={field.name} />;
          })}
        </>
        <GridFormButtons cancel={cancel} {...submit} />
        {children}
      </LayoutGrid>
    </ConnectedForm>
  );
}
