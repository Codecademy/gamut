import { screenReaderOnly } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';
import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import * as React from 'react';

import { FlexBox } from '../../Box';
import { InfoTip, InfoTipProps } from '../../Tip';
import {
  conditionalRadioInputStyles,
  conditionalRadioLabelStyles,
  radioInput,
  radioLabel,
  radioWrapper,
} from '../styles';
import { BaseInputProps } from '../types';

export type RadioProps = InputHTMLAttributes<HTMLInputElement> &
  Omit<BaseInputProps, 'label'> & {
    checked?: boolean;
    disabled?: boolean;
    id?: string;
    /**
     * Infotip props to render to the right of your radio label
     */
    infotip?: InfoTipProps;
    /**
     * A label for your Radio input - should not include infotips or other interactive elements
     */
    label?: ReactNode;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    /**
     * Specifies the tab order of the Radio input
     */
    tabIndex?: number;
    value?: string;
    readOnly?: boolean;
  };
export interface RadioElementProps
  extends RadioProps,
    StyleProps<typeof conditionalRadioInputStyles> {}

const RadioWrapper = styled.div(radioWrapper);
const RadioLabel = styled.label<RadioElementProps>(
  radioLabel,
  conditionalRadioLabelStyles
);
const RadioInput = styled.input<RadioElementProps>(
  screenReaderOnly,
  radioInput,
  conditionalRadioInputStyles
);

const conditionalStyleState = (error?: boolean, disabled?: boolean) => {
  return error ? 'error' : disabled ? 'disabled' : undefined;
};

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      checked,
      className,
      disabled,
      error,
      htmlFor,
      id,
      infotip,
      label,
      name,
      onChange,
      required,
      value,
      ...rest
    },
    ref
  ) => {
    const inputId = id ? `${htmlFor}-${id}` : htmlFor;
    const styleState = conditionalStyleState(error, disabled);

    return (
      <RadioWrapper className={className}>
        <RadioInput
          id={inputId}
          name={name}
          required={required}
          type="radio"
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          ref={ref}
          value={value}
          variant={styleState}
          {...rest}
        />
        <RadioLabel htmlFor={htmlFor} disabled={disabled} variant={styleState}>
          {label}
        </RadioLabel>
        {infotip && (
          <FlexBox center pl={8}>
            <InfoTip {...infotip} />
          </FlexBox>
        )}
      </RadioWrapper>
    );
  }
);
