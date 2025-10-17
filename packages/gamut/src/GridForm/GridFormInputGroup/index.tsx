import * as React from 'react';
import { UseFormReturn } from 'react-hook-form';

import { FormGroup, FormGroupLabel } from '../../Form';
import { HiddenText } from '../../HiddenText';
import { Column } from '../../Layout';
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
      <Column rowspan={field?.rowspan ?? 1} size={field?.size}>
        {getInput()}
      </Column>
    );
  }

  const label = (
    <FormGroupLabel
      disabled={disabled}
      htmlFor={field.id || field.name}
      infotip={field.infotip}
      isSoloField={rest?.isSoloField || field?.isSoloField}
      required={rest?.required}
    >
      {field.label}
    </FormGroupLabel>
  );

  return (
    <Column rowspan={field?.rowspan ?? 1} size={field?.size}>
      <FormGroup 
        error={errorMessage}
        errorType={isTightCheckbox ? 'initial' : 'absolute'}
        isFirstError={isFirstError}
        spacing={isTightCheckbox ? 'tight' : 'padded'}
      >
        {field.hideLabel ? <HiddenText>{label}</HiddenText> : label}
        {getInput()}
      </FormGroup>
    </Column>
  );
};
