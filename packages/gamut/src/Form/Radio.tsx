import { Colors, noSelect, screenReaderOnly } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React, { forwardRef, InputHTMLAttributes, ReactNode } from 'react';

import {
  conditionalRadioStyles,
  radioInput,
  radioLabel,
  radioWrapper,
} from './styles/shared-system-props';

export type RadioProps = InputHTMLAttributes<HTMLInputElement> & {
  checked?: boolean;
  disabled?: boolean;
  htmlFor?: string;
  id?: string;
  label?: ReactNode;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  tabIndex?: number;
  value?: string;
  readOnly?: boolean;
};

const RadioWrapper = styled.div(noSelect, radioWrapper);
const RadioLabel = styled.label<RadioProps>(noSelect, radioLabel);
const RadioInput = styled.input<RadioProps>(
  screenReaderOnly,
  radioInput,
  conditionalRadioStyles
);

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      name,
      value,
      label,
      checked,
      className,
      disabled,
      htmlFor,
      onChange,
      required,
      id,
      ...rest
    },
    ref
  ) => {
    const inputId = id ? `${htmlFor}-${id}` : htmlFor;

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
          variant={'error'}
          {...rest}
        />
        <RadioLabel htmlFor={htmlFor} disabled={disabled}>
          {label}
        </RadioLabel>
      </RadioWrapper>
    );
  }
);
