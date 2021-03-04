import { AlertIcon, CheckCircledIcon } from '@codecademy/gamut-icons';
import { pxRem, theme } from '@codecademy/gamut-styles';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { ComponentType, forwardRef, InputHTMLAttributes } from 'react';

import { Box } from '../Box';
import { errorStyle, formBaseFieldStyles, iconStyles } from './styles/shared';

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
  verified?: boolean;
};

export type InputProps = InputHTMLAttributes<HTMLInputElement> &
  InputComponentProps;

export type InputWrapperProps = InputProps & {
  component?: ComponentType<any>;
};

const inputIconStyles = css`
  ${iconStyles}
  top: calc(50% - (${pxRem(8)} + ${theme.spacing[4]}));
`;

export const ReactRecurlyStyles = (props: any) => css`
  ${formBaseFieldStyles}
  ${errorStyle(props)}
  box-sizing: border-box;
  text-indent: 0;
`;

const InputElement = styled.input<InputProps>`
  ${formBaseFieldStyles}
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
    { error, htmlFor, className, id, verified, component: Component, ...rest },
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
        {verified && <StyledCheckCircledIcon color="green" />}
      </Box>
    );
  }
);

Input.defaultProps = {
  type: 'text',
};
