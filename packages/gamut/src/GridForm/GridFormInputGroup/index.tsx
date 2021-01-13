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
`;

const StyledGridFormCheckboxInput = styled(GridFormCheckboxInput)`
  width: 100%;
`;
const StyledGridFormCustomInput = styled(GridFormCustomInput)`
  width: 100%;
`;
const StyledGridFormFileInput = styled(GridFormFileInput)`
  width: 100%;
`;
const StyledGridFormRadioGroupInput = styled(GridFormRadioGroupInput)`
  width: 100%;
`;
const StyledGridFormSelectInput = styled(GridFormSelectInput)`
  width: 100%;
`;
const StyledGridFormTextArea = styled(GridFormTextArea)`
  width: 100%;
`;

const StyledGridFormTextInput = styled(GridFormTextInput)`
  width: 100%;
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
          <StyledGridFormCheckboxInput
            field={props.field}
            register={props.register}
          />
        );

      case 'custom':
        return (
          <StyledGridFormCustomInput
            field={props.field}
            register={props.register}
            setValue={props.setValue}
            error={props.error}
          />
        );

      case 'radio-group':
        return (
          <StyledGridFormRadioGroupInput
            field={props.field}
            register={props.register}
            setValue={props.setValue}
          />
        );

      case 'select':
        return (
          <StyledGridFormSelectInput
            error={!!props.error}
            field={props.field}
            register={props.register}
          />
        );

      case 'file':
        return (
          <StyledGridFormFileInput
            error={!!props.error}
            field={props.field}
            register={props.register}
          />
        );

      case 'textarea':
        return (
          <StyledGridFormTextArea
            error={!!props.error}
            field={props.field}
            register={props.register}
          />
        );

      default:
        return (
          <StyledGridFormTextInput
            error={!!props.error}
            field={props.field}
            register={props.register}
          />
        );
    }
  };

  return (
    <Column size={props.field.size}>
      <StyledFormGroup>
        {props.field.hideLabel ? (
          <HiddenText as="label" htmlFor={props.field.id || props.field.name}>
            {props.field.label}
          </HiddenText>
        ) : (
          <StyledFormGroupLabel htmlFor={props.field.id || props.field.name}>
            {props.field.label}
          </StyledFormGroupLabel>
        )}
        {props.error && (
          <FormError aria-live={props.isFirstError ? 'assertive' : 'off'}>
            {props.error}
          </FormError>
        )}
        {getInput()}
      </StyledFormGroup>
    </Column>
  );
};
