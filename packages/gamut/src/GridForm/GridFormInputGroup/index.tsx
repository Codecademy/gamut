import { InfoCircleIcon } from '@codecademy/gamut-icons';
import styled from '@emotion/styled';
import React from 'react';
import { UseFormMethods } from 'react-hook-form';

import { FormError, FormGroup, FormGroupLabel } from '../../Form';
import { HiddenText } from '../../HiddenText';
import { Column } from '../../Layout';
import { ToolTip } from '../../ToolTip';
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
        {field.toolTip && (
          <ToolTip
            focusable
            position={field.toolTip.position}
            target={<InfoCircleIcon size={field.toolTip.size} />}
            id={field.toolTip.id}
            theme={field.toolTip.theme}
          >
            {field.toolTip.children}
          </ToolTip>
        )}
        {getInput()}
      </StyledFormGroup>
    </Column>
  );
};
