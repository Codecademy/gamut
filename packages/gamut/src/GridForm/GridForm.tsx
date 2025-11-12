import { Fragment, useMemo } from 'react';
import * as React from 'react';
import {
  DeepPartial,
  DefaultValues,
  Mode,
  SubmitHandler,
  UnpackNestedValue,
} from 'react-hook-form';

import { ButtonProps } from '../Button';
import { ConnectedForm, FormContextProps } from '../ConnectedForm';
import { FormRequiredText } from '../Form/elements/FormRequiredText';
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
  GridFormRequiredTextProps,
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
  return (field as GridFormSectionProps)?.title !== undefined;
};

export type GridFormProps<Values extends {}> = FormContextProps &
  GridFormRequiredTextProps & {
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
     * If your form has a single visible field. You should only have to set this if you have a single field in addition to hidden custom rendered inputs, otherwise it should happen automatically.
     */
    hasSoloField?: boolean;

    /**
     * Function called with field values on submit, if all validations have passed.
     */
    onSubmit: SubmitHandler<Values>;

    /**
     * Whether to hide 'required' explanation at the start of forms - should be disabled only for forms without a required field.
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
  hasSoloField = false,
  hideRequiredText = false,
  requiredTextProps,
  rowGap = 16,
  submit,
  validation = 'onSubmit',
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

  const hiddenInputCount = useMemo(
    () =>
      flatFields.filter(
        (field) => field.type === 'hidden' || field.type === 'sweet-container'
      ),
    [flatFields]
  );
  const hasComputedSoloField =
    flatFields.length - hiddenInputCount.length === 1 || hasSoloField === true;

  const showRequiredText = hideRequiredText ? false : !hasComputedSoloField;

  return (
    <ConnectedForm<Values>
      defaultValues={defaultValues as DefaultValues<Values>}
      display="flex"
      flexDirection="column"
      isSoloField={hasComputedSoloField}
      validation={validation}
      {...rest}
    >
      <LayoutGrid columnGap={columnGap} rowGap={rowGap}>
        <>
          {showRequiredText && !isGridFormSection(fields[0]) && (
            <Column size={12}>
              <FormRequiredText {...requiredTextProps} />
            </Column>
          )}
          {fields.map((field, index) => {
            const numSections = fields.length;
            if (isGridFormSection(field)) {
              const { title, as, layout, fields, variant } = field;
              return (
                <Fragment key={title}>
                  <GridFormSectionTitle
                    as={as}
                    layout={layout}
                    numberOfFields={fields.length}
                    requiredTextProps={
                      index === 0 && showRequiredText
                        ? requiredTextProps
                        : undefined
                    }
                    showRequired={index === 0 && showRequiredText}
                    title={title}
                    variant={variant}
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
