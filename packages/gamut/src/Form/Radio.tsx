import styled from '@emotion/styled';
import cx from 'classnames';
import React, { forwardRef, InputHTMLAttributes, ReactNode } from 'react';

import styles from './styles/Radio.module.scss';
import {
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

const RadioWrapper = styled.div`
  ${radioWrapper}
`;

const RadioLabel = styled.label<RadioProps>`
  ${radioLabel}
`;

const RadioInput = styled.input<RadioProps>`
  ${radioInput}
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
          {...rest}
        />
        <RadioLabel htmlFor={htmlFor}>{label}</RadioLabel>
      </RadioWrapper>
    );
  }
);
