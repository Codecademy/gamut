import styled from '@emotion/styled';
import React from 'react';
import { UseFormMethods } from 'react-hook-form';

import { Box } from '../../Box';
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
import { GridFormToolTipWrapper } from './GridFormToolTipWrapper';

export type GridFormInputGroupProps = {
  error?: string;
  isFirstError?: boolean;
  field: GridFormField;
  register: UseFormMethods['register'];
  setValue: (value: any) => void;
  required?: boolean;
  showRequired?: boolean;
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
        return <GridFormCheckboxInput field={field} register={register} />;

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
            setValue={setValue}
          />
        );

      case 'select':
        return (
          <GridFormSelectInput
            error={!!errorMessage}
            field={field}
            register={register}
          />
        );

      case 'file':
        return (
          <GridFormFileInput
            error={!!errorMessage}
            field={field}
            register={register}
          />
        );

      case 'textarea':
        return (
          <GridFormTextArea
            error={!!errorMessage}
            field={field}
            register={register}
          />
        );

      default:
        return (
          <GridFormTextInput
            error={!!errorMessage}
            field={field}
            register={register}
          />
        );
    }
  };

  const label = (
    <GridFormToolTipWrapper field={field}>
      <StyledFormGroupLabel
        disabled={field.disabled}
        htmlFor={field.id || field.name}
        showRequired={showRequired}
      >
        {field.label}
      </StyledFormGroupLabel>
    </GridFormToolTipWrapper>
  );

  return (
    <Column size={field.size}>
      <Box>
        <StyledFormGroup>
          {field.hideLabel ? <HiddenText>{label}</HiddenText> : label}
          {getInput()}
          {errorMessage && (
            <FormError aria-live={isFirstError ? 'assertive' : 'off'}>
              {errorMessage}
            </FormError>
          )}
        </StyledFormGroup>
      </Box>
    </Column>
  );
};
