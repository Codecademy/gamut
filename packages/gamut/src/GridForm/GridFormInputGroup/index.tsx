import React from 'react';
import { UseFormMethods } from 'react-hook-form';

import { FormError, FormGroup, FormGroupLabel } from '../../Form';
import { HiddenText } from '../../HiddenText';
import { Column } from '../../Layout';
import { GridFormField } from '../types';
import { GridFormCheckboxInput } from './GridFormCheckboxInput';
import { GridFormCustomInput } from './GridFormCustomInput';
import { GridFormFileInput } from './GridFormFileInput';
import { GridFormRadioGroupInput } from './GridFormRadioGroupInput';
import { GridFormSelectInput } from './GridFormSelectInput';
import { GridFormTextArea } from './GridFormTextArea';
import { GridFormTextInput } from './GridFormTextInput';

export type GridFormInputGroupProps = {
  error?: string;
  isFirstError?: boolean;
  field: GridFormField;
  register: UseFormMethods['register'];
  setValue: UseFormMethods['setValue'];
  required?: boolean;
  showRequired?: boolean;
};

export const GridFormInputGroup: React.FC<GridFormInputGroupProps> = ({
  error,
  isFirstError,
  field,
  register,
  setValue,
  showRequired,
}) => {
  const errorMessage = error || field.customError;

  const getInput = () => {
    switch (field.type) {
      case 'checkbox':
        return (
          <GridFormCheckboxInput
            field={field}
            register={register}
            showRequired={showRequired}
          />
        );

      case 'custom':
        return (
          <GridFormCustomInput
            field={field}
            register={register}
            setValue={setValue}
            error={errorMessage}
          />
        );

      case 'radio-group':
        return (
          <GridFormRadioGroupInput
            field={field}
            register={register}
            showRequired={showRequired}
            setValue={setValue}
          />
        );

      case 'select':
        return (
          <GridFormSelectInput
            error={!!errorMessage}
            field={field}
            register={register}
            showRequired={showRequired}
          />
        );

      case 'file':
        return (
          <GridFormFileInput
            error={!!errorMessage}
            field={field}
            register={register}
            showRequired={showRequired}
          />
        );

      case 'textarea':
        return (
          <GridFormTextArea
            error={!!errorMessage}
            field={field}
            register={register}
            showRequired={showRequired}
          />
        );

      default:
        return (
          <GridFormTextInput
            error={!!errorMessage}
            field={field}
            register={register}
            showRequired={showRequired}
          />
        );
    }
  };

  const label = (
    <FormGroupLabel
      disabled={field.disabled}
      htmlFor={field.id || field.name}
      tooltip={field.tooltip}
      showRequired={showRequired}
    >
      {field.label}
    </FormGroupLabel>
  );

  return (
    <Column size={field.size}>
      <FormGroup marginBottom={0}>
        {field.hideLabel ? <HiddenText>{label}</HiddenText> : label}
        {getInput()}
        {errorMessage && (
          <FormError
            role={isFirstError ? 'alert' : 'status'}
            aria-live={isFirstError ? 'assertive' : 'off'}
          >
            {errorMessage}
          </FormError>
        )}
      </FormGroup>
    </Column>
  );
};
