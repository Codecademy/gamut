import React from 'react';
import { UseFormMethods } from 'react-hook-form';

import { ConnectedFormGroup } from '../../ConnectedForm';
import { GridFormCheckboxInput } from '../../ConnectedForm/Inputs/GridFormCheckboxInput';
import { Column } from '../../Layout';
import {
  GridFormField,
  GridFormHiddenField,
  GridFormSweetContainerField,
} from '../types';
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
  isFirstError?: boolean;
  isDisabled?: boolean;
  field: GridFormField;
  register: UseFormMethods['register'];
  setValue: UseFormMethods['setValue'];
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

  return (
    <Column size={field?.size} rowspan={field?.rowspan ?? 1}>
      <ConnectedFormGroup
        customError={field.customError}
        disabled={field.disabled}
        hideLabel={field.hideLabel}
        id={field.id}
        label={field.label}
        name={field.name}
        required={rest?.required}
        showRequired={showRequired}
        spacing={
          field.type === 'checkbox' && field?.spacing === 'tight'
            ? 'tight'
            : 'base'
        }
        tooltip={field.tooltip}
      >
        {getInput()}
      </ConnectedFormGroup>
    </Column>
  );
};
