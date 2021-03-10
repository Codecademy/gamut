import { AlertIcon, CheckCircledIcon } from '@codecademy/gamut-icons';
import { css } from '@emotion/react';
import styled, { StyledComponent } from '@emotion/styled';
import React, { forwardRef, InputHTMLAttributes, useState } from 'react';

import { Box } from '../Box';
import {
  conditionalStyleProps,
  conditionalStyles,
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

export type StyledInputProps = InputProps & {
  activated?: boolean;
};

export type InputWrapperProps = InputProps & {
  component?: StyledComponent<
    StyledInputProps,
    React.DetailedHTMLProps<
      InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >
  >;
};

const inputIconStyles = css`
  ${iconStyles}
`;

const iFrameStyles = ({ error, activated }: conditionalStyleProps) => css`
  ${formBaseFieldStyles}
  ${conditionalStyles({ error, activated })}
  box-sizing: border-box;
  text-indent: 0;
`;

export const iFrameWrapper = styled.div`
  ${iFrameStyles}
`;

const InputElement = styled.input<StyledInputProps>`
  ${formFieldStyles}
  ${conditionalStyles}
  box-sizing: border-box;
  text-indent: 0;
`;

const StyledAlertIcon = styled(AlertIcon)(inputIconStyles);

const StyledCheckCircledIcon = styled(CheckCircledIcon)(inputIconStyles);

export const Input = forwardRef<HTMLInputElement, InputWrapperProps>(
  ({ error, className, id, valid, component: Component, ...rest }, ref) => {
    const [activated, setActivated] = useState(false);

    return (
      <Box position="relative" onChange={() => setActivated(true)}>
        {Component ? (
          <Component
            {...rest}
            id={id || rest.htmlFor}
            ref={ref}
            error={error}
            activated={activated}
            className={className}
          />
        ) : (
          <InputElement
            {...rest}
            id={id || rest.htmlFor}
            ref={ref}
            error={error}
            className={className}
            activated={activated}
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
