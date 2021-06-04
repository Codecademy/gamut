import { Colors, noSelect, screenReaderOnly } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React, { forwardRef, InputHTMLAttributes, ReactNode } from 'react';

import { radioLabel, radioWrapper } from './styles/shared-system-props';

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
  backgroundColor?: Colors;
};

const RadioWrapper = styled.div`
  ${noSelect}
  ${radioWrapper}
`;

const RadioLabel = styled.label<RadioProps>`
  ${noSelect}
  ${radioLabel}
  &::after {
    transform: scale(0);
  }
`;
// background-color:  ${(props) => ({ theme }) =>
//   theme.colors[props.backgroundColor ? props.backgroundColor : 'background']};
//   background-color: ${({ theme }) => theme.colors.primary};
// }

const RadioInput = styled.input<RadioProps>`
  ${screenReaderOnly}

  &:checked:not(:disabled) + ${RadioLabel}::after {
    background-color: ${({ theme }) => theme.colors.primary};
  }
  &:checked + ${RadioLabel}::after {
    transform: scale(1);
    border: 4px solid ${({ theme }) => theme.colors.background};
  }
  &:checked + ${RadioLabel}::before {
    box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.primary};
  }
  &:hover:not(:disabled) + ${RadioLabel}::before {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary};
  }
  &:disabled:checked + ${RadioLabel}::before {
    background-color: ${({ theme }) => theme.colors['gray-300']};
    border: 0.25rem solid ${({ theme }) => theme.colors.background};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.colors['gray-600']};
  }
  &:disabled + ${RadioLabel} {
    color: ${({ theme }) => theme.colors['gray-300']};
  }
  &:focus + ${RadioLabel}::before {
    box-shadow: 0 0 0 4px ${({ theme }) => theme.colors.primary};
  }
`;

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
      backgroundColor = 'background',
      ...rest
    },
    ref
  ) => {
    const inputId = id ? `${htmlFor}-${id}` : htmlFor;

    return (
      <RadioWrapper className={className}>
        <RadioInput
          // className={styles.radioInput}
          id={inputId}
          name={name}
          required={required}
          type="radio"
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          ref={ref}
          value={value}
          backgroundColor={backgroundColor}
          {...rest}
        />
        <RadioLabel htmlFor={htmlFor}>{label}</RadioLabel>
      </RadioWrapper>
    );
  }
);
