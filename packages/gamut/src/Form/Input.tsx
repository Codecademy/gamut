import { AlertIcon, CheckCircledIcon } from '@codecademy/gamut-icons';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { ComponentType, forwardRef, InputHTMLAttributes } from 'react';

import { Box } from '../Box';
import {
  errorStyle,
  formBaseFieldStyles,
  formFieldStyles,
  iconStyles,
} from './styles/shared';

export type InputComponentProps = InputHTMLAttributes<HTMLInputElement> & {
  id?: string;
  className?: string;
  error?: boolean;
  htmlFor?: string;
  label?: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
  validated?: boolean;
};

export type InputProps = InputHTMLAttributes<HTMLInputElement> &
  InputComponentProps;

export type InputWrapperProps = InputProps & {
  component?: ComponentType<any>;
};

const inputIconStyles = css`
  ${iconStyles}
`;

export const ReactRecurlyStyles = (props: any) => css`
  ${formBaseFieldStyles}
  ${errorStyle(props)}
  box-sizing: border-box;
  text-indent: 0;
`;

const InputElement = styled.input<InputProps>`
  ${formFieldStyles}
  ${errorStyle}
  box-sizing: border-box;
  text-indent: 0;
`;

const StyledAlertIcon = styled(AlertIcon)`
  ${inputIconStyles}
`;

const StyledCheckCircledIcon = styled(CheckCircledIcon)`
  ${inputIconStyles}
`;

export const Input = forwardRef<HTMLInputElement, InputWrapperProps>(
  (
    { error, htmlFor, className, id, validated, component: Component, ...rest },
    ref
  ) => {
    return (
      <Box position="relative">
        {Component ? (
          <Component
            id={id || htmlFor}
            ref={ref}
            error={error}
            className={className}
            {...rest}
          />
        ) : (
          <InputElement
            {...rest}
            id={id || htmlFor}
            ref={ref}
            error={error}
            className={className}
          />
        )}
        {error && <StyledAlertIcon color="red" />}
        {validated && <StyledCheckCircledIcon color="green" />}
      </Box>
    );
  }
);

Input.defaultProps = {
  type: 'text',
};
