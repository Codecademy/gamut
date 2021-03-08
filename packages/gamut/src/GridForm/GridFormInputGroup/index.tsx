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
import { GridFormToolTipWrapper } from './GridFormToolTipWrapper';

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
          <GridFormToolTipWrapper tooltip={field.toolTip}>
            <GridFormCustomInput
              field={field}
              register={register}
              setValue={setValue}
              error={error}
            />
          </GridFormToolTipWrapper>
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
          <GridFormToolTipWrapper tooltip={field.toolTip}>
            <GridFormSelectInput
              error={!!error}
              field={field}
              register={register}
            />
          </GridFormToolTipWrapper>
        );

      case 'file':
        return (
          <GridFormToolTipWrapper tooltip={field.toolTip}>
            <GridFormFileInput
              error={!!error}
              field={field}
              register={register}
            />
          </GridFormToolTipWrapper>
        );

      case 'textarea':
        return (
          <GridFormTextArea error={!!error} field={field} register={register} />
        );

      default:
        return (
          <GridFormToolTipWrapper tooltip={field.toolTip}>
            <GridFormTextInput
              error={!!error}
              field={field}
              register={register}
            />
          </GridFormToolTipWrapper>
        );
    }
  };

  const label = (
    <StyledFormGroupLabel
      disabled={field.disabled}
      htmlFor={field.id || field.name}
    >
      {field.label}
    </StyledFormGroupLabel>
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
