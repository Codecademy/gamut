import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import * as React from 'react';
import { UseFormReturn } from 'react-hook-form';

import { Anchor } from '../../Anchor';
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
  isFirstError?: boolean;
  isDisabled?: boolean;
  field: GridFormField;
  register: UseFormReturn['register'];
  setValue: UseFormReturn['setValue'];
  required?: boolean;
  showRequired?: boolean;
};

export const GridFormInputGroup: React.FC<GridFormInputGroupProps> = ({
  error,
  field,
  isFirstError,
  isDisabled,
  showRequired,
  ...rest
}) => {
  const disabled = isDisabled || field.disabled;
  const errorMessage = error || field.customError;
  const defaultProps = { disabled, ...rest };
  const isTightCheckbox =
    field.type === 'checkbox' && field?.spacing === 'tight';

  const getInput = () => {
    switch (field.type) {
      case 'checkbox':
        return <GridFormCheckboxInput field={field} {...defaultProps} />;

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
      <Column size={field?.size} rowspan={field?.rowspan ?? 1}>
        {getInput()}
      </Column>
    );
  }

  const label = (
    <FormGroupLabel
      disabled={disabled}
      htmlFor={field.id || field.name}
      infotip={field.infotip}
      showRequired={showRequired && rest?.required}
    >
      {field.label}
    </FormGroupLabel>
  );

  return (
    <Column size={field?.size} rowspan={field?.rowspan ?? 1}>
      <FormGroup spacing={isTightCheckbox ? 'tight' : 'padded'}>
        {field.hideLabel ? <HiddenText>{label}</HiddenText> : label}
        {getInput()}
        {errorMessage && (
          <FormError
            role={isFirstError ? 'alert' : 'status'}
            aria-live={isFirstError ? 'assertive' : 'off'}
            variant={isTightCheckbox ? 'initial' : 'absolute'}
          >
            <Markdown
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
              inline
              text={errorMessage}
              spacing="none"
            />
          </FormError>
        )}
      </FormGroup>
    </Column>
  );
};
