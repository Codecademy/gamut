import styled from '@emotion/styled';
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
  setValue: (value: any) => void;
};

const StyledFormGroup = styled(FormGroup)`
  margin-bottom: 0;

  // This is always the input
  > *:last-child {
    width: 100%;
  }
`;

const StyledFormGroupLabel = styled(FormGroupLabel)`
  display: inline-block;
  margin-right: 0.5rem;
`;

export const GridFormInputGroup: React.FC<GridFormInputGroupProps> = (
  props
) => {
  const getInput = () => {
    switch (props.field.type) {
      case 'checkbox':
        return (
          <GridFormCheckboxInput
            field={props.field}
            register={props.register}
          />
        );

      case 'custom':
        return (
          <GridFormCustomInput
            field={props.field}
            register={props.register}
            setValue={props.setValue}
            error={props.error}
          />
        );

      case 'radio-group':
        return (
          <GridFormRadioGroupInput
            field={props.field}
            register={props.register}
            setValue={props.setValue}
          />
        );

      case 'select':
        return (
          <GridFormSelectInput
            error={!!props.error}
            field={props.field}
            register={props.register}
          />
        );

      case 'file':
        return (
          <GridFormFileInput
            error={!!props.error}
            field={props.field}
            register={props.register}
          />
        );

      case 'textarea':
        return (
          <GridFormTextArea
            error={!!props.error}
            field={props.field}
            register={props.register}
          />
        );

      default:
        return (
          <GridFormTextInput
            error={!!props.error}
            field={props.field}
            register={props.register}
          />
        );
    }
  };

  const label = (
    <StyledFormGroupLabel
      htmlFor={props.field.id || props.field.name}
      aria-live="assertive"
    >
      {props.field.label}
    </StyledFormGroupLabel>
  );

  const ariaLabelError = (error: string) =>
    error === 'Required' ? `${props.field.label} ${error}` : error;

  return (
    <Column size={props.field.size}>
      <StyledFormGroup>
        {props.field.hideLabel ? <HiddenText>{label}</HiddenText> : label}
        {props.error && (
          <FormError
            aria-live={props.isFirstError ? 'assertive' : 'off'}
            aria-label={ariaLabelError(props.error)}
          >
            TESTING
          </FormError>
        )}
        {getInput()}
      </StyledFormGroup>
    </Column>
  );
};
