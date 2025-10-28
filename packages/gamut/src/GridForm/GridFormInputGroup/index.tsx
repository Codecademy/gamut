import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import * as React from 'react';
import { UseFormReturn } from 'react-hook-form';

import { Anchor } from '../../Anchor';
import { Box } from '../../Box';
import { FormError, FormGroup, FormGroupLabel } from '../../Form';
import { HiddenText } from '../../HiddenText';
import { Column } from '../../Layout';
import { Markdown } from '../../Markdown';
import {
  GridFormField,
  GridFormHiddenField,
  GridFormSweetContainerField,
} from '../types';
import { GridFormCheckboxInput } from './GridFormCheckboxInput';
import { GridFormCustomInput } from './GridFormCustomInput';
import { GridFormFileInput } from './GridFormFileInput';
import { GridFormHiddenInput } from './GridFormHiddenInput';
import { GridFormNestedCheckboxInput } from './GridFormNestedCheckboxInput';
import { GridFormRadioGroupInput } from './GridFormRadioGroupInput';
import { GridFormSelectInput } from './GridFormSelectInput';
import { GridFormSweetContainerInput } from './GridFormSweetContainerInput';
import { GridFormTextArea } from './GridFormTextArea';
import { GridFormTextInput } from './GridFormTextInput';

const ErrorAnchor = styled(Anchor)(
  css({
    color: 'feedback-error',
  })
);

export type GridFormInputGroupProps = {
  error?: string;
  field: GridFormField;
  isDisabled?: boolean;
  isFirstError?: boolean;
  isSoloField?: boolean;
  register: UseFormReturn['register'];
  required?: boolean;
  setValue: UseFormReturn['setValue'];
};

export const GridFormInputGroup: React.FC<GridFormInputGroupProps> = ({
  error,
  field,
  isFirstError,
  isDisabled,
  ...rest
}) => {
  const disabled = isDisabled || field.disabled;
  const errorMessage = error || field.customError;
  const defaultProps = { disabled, ...rest };
  const isTightCheckbox =
    (field.type === 'checkbox' || field.type === 'nested-checkboxes') &&
    field?.spacing === 'tight';

  const getInput = () => {
    switch (field.type) {
      case 'checkbox':
        return <GridFormCheckboxInput field={field} {...defaultProps} />;

      case 'nested-checkboxes':
        return (
          <GridFormNestedCheckboxInput
            error={!!errorMessage}
            field={field}
            {...defaultProps}
          />
        );

      case 'custom':
      case 'custom-group':
        return (
          <GridFormCustomInput
            error={errorMessage}
            field={field}
            {...defaultProps}
          />
        );

      case 'radio-group':
        return (
          <GridFormRadioGroupInput
            error={!!errorMessage}
            field={field}
            {...defaultProps}
          />
        );

      case 'select':
        return (
          <GridFormSelectInput
            error={!!errorMessage}
            field={field}
            {...defaultProps}
          />
        );

      case 'file':
        return (
          <GridFormFileInput
            error={!!errorMessage}
            field={field}
            {...defaultProps}
          />
        );

      case 'textarea':
        return (
          <GridFormTextArea
            error={!!errorMessage}
            field={field}
            {...defaultProps}
          />
        );
      case 'hidden':
        return <GridFormHiddenInput field={field} {...defaultProps} />;

      case 'sweet-container':
        return (
          <GridFormSweetContainerInput
            field={field}
            label={field.label}
            {...defaultProps}
          />
        );

      default:
        return (
          <GridFormTextInput
            error={!!errorMessage}
            field={field}
            {...defaultProps}
          />
        );
    }
  };

  const unwrappedInput = (
    field: GridFormField
  ): field is GridFormHiddenField | GridFormSweetContainerField =>
    ['hidden', 'sweet-container'].includes(field.type);

  if (unwrappedInput(field)) {
    return getInput();
  }

  if (field.type === 'custom-group') {
    return (
      <Column rowspan={field?.rowspan ?? 1} size={field?.size}>
        {getInput()}
      </Column>
    );
  }

  const useFieldsetLegend = field.type === 'nested-checkboxes';

  const label = (
    <FormGroupLabel
      asLegend={useFieldsetLegend}
      disabled={disabled}
      htmlFor={field.id || field.name}
      infotip={field.infotip}
      isSoloField={rest?.isSoloField || field?.isSoloField}
      required={rest?.required}
    >
      {field.label}
    </FormGroupLabel>
  );

  const renderedInput = (
    <>
      {field.hideLabel ? <HiddenText>{label}</HiddenText> : label}
      {getInput()}
      {errorMessage && (
        <FormError
          aria-live={isFirstError ? 'assertive' : 'off'}
          role={isFirstError ? 'alert' : 'status'}
          variant={isTightCheckbox ? 'initial' : 'absolute'}
        >
          <Markdown
            inline
            overrides={{
              a: {
                allowedAttributes: ['href', 'target'],
                component: ErrorAnchor,
                processNode: (
                  node: unknown,
                  props: { onClick?: () => void }
                ) => <ErrorAnchor {...props} />,
              },
            }}
            skipDefaultOverrides={{ a: true }}
            spacing="none"
            text={errorMessage}
          />
        </FormError>
      )}
    </>
  );

  return (
    <Column rowspan={field?.rowspan ?? 1} size={field?.size}>
      <FormGroup spacing={isTightCheckbox ? 'tight' : 'padded'} />
      {useFieldsetLegend ? (
        <Box as="fieldset" border="none" m={0} p={0}>
          {renderedInput}
        </Box>
      ) : (
        renderedInput
      )}
    </Column>
  );
};
