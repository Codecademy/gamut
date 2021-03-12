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

export const GridFormInputGroup: React.FC<GridFormInputGroupProps> = ({
  field,
  isFirstError,
  register,
  setValue,
  error,
}) => {
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
            error={error}
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
            error={!!error}
            field={field}
            register={register}
          />
        );

      case 'file':
        return (
          <GridFormFileInput
            error={!!error}
            field={field}
            register={register}
          />
        );

      case 'textarea':
        return (
          <GridFormTextArea error={!!error} field={field} register={register} />
        );

      default:
        return (
          <GridFormTextInput
            error={!!error}
            field={field}
            register={register}
          />
        );
    }
  };

  const label = (
    <FormGroupLabel
      disabled={field.disabled}
      htmlFor={field.id || field.name}
      tooltip={field.toolTip}
    >
      {field.label}
    </FormGroupLabel>
  );

  return (
    <Column size={field.size}>
      <StyledFormGroup>
        {field.hideLabel ? <HiddenText>{label}</HiddenText> : label}
        {error && (
          <FormError aria-live={isFirstError ? 'assertive' : 'off'}>
            {error}
          </FormError>
        )}
        {getInput()}
      </StyledFormGroup>
    </Column>
  );
};
