import { screenReaderOnly } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';
import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import * as React from 'react';

import { FlexBox } from '../../Box';
import { InfoTip, InfoTipProps } from '../../Tip/InfoTip';
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
          checked={checked}
          disabled={disabled}
          id={inputId}
          name={name}
          ref={ref}
          required={required}
          type="radio"
          value={value}
          variant={styleState}
          onChange={onChange}
          {...rest}
        />
        <RadioLabel disabled={disabled} htmlFor={htmlFor} variant={styleState}>
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
