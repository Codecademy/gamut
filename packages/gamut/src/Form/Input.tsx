import { AlertIcon, CheckCircledIcon } from '@codecademy/gamut-icons';
import { css } from '@emotion/react';
import styled, { StyledComponent } from '@emotion/styled';
import React, { forwardRef, InputHTMLAttributes } from 'react';

import { Box } from '../Box';
import {
  errorStateProps,
  errorStyle,
  formBaseFieldStyles,
  formFieldStyles,
  iconStyles,
} from './styles/shared';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  id?: string;
  className?: string;
  error?: boolean;
  htmlFor?: string;
  label?: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
  valid?: boolean;
};

export type InputWrapperProps = InputProps & {
  component?: StyledComponent<
    InputProps,
    React.DetailedHTMLProps<
      InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >
  >;
};

const inputIconStyles = css`
  ${iconStyles}
`;

export const ReactRecurlyStyles = ({ error }: errorStateProps) => css`
  ${formBaseFieldStyles}
  ${errorStyle({ error })}
  box-sizing: border-box;
  text-indent: 0;
`;

const InputElement = styled.input<InputProps>`
  ${formFieldStyles}
  ${errorStyle}
  box-sizing: border-box;
  text-indent: 0;
`;

const StyledAlertIcon = styled(AlertIcon)(inputIconStyles);

const StyledCheckCircledIcon = styled(CheckCircledIcon)(inputIconStyles);

export const Input = forwardRef<HTMLInputElement, InputWrapperProps>(
  (
    { error, htmlFor, className, id, valid, component: Component, ...rest },
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
        {valid && <StyledCheckCircledIcon color="green" />}
      </Box>
    );
  }
);

Input.defaultProps = {
  type: 'text',
};
