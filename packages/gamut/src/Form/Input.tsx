import { AlertIcon, CheckCircledIcon } from '@codecademy/gamut-icons';
import { css } from '@emotion/react';
import styled, { StyledComponent } from '@emotion/styled';
import React, { forwardRef, InputHTMLAttributes, useState } from 'react';

import { Box } from '../Box';
import {
  conditionalInputStyleProps,
  conditionalStyles,
  formBaseFieldStyles,
  formFieldStyles,
  iconPadding,
  iconStyles,
} from './styles/shared';

type InputBaseProps = {
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

type StyledInputProps = { activated?: boolean; icon?: boolean };

export type InputProps = InputHTMLAttributes<HTMLInputElement> & InputBaseProps;

export type StyledInputElementProps = InputProps & StyledInputProps;

export type StyledAsInputProps = InputBaseProps & StyledInputProps;

export type InputWrapperProps = InputProps & {
  as?: StyledComponent<StyledAsInputProps>;
};

const inputIconStyles = css`
  ${iconStyles}
`;

export const iFrameWrapper = styled.div<conditionalInputStyleProps>(
  ({ error, activated, icon }) => css`
    ${formBaseFieldStyles}
    ${conditionalStyles({ error, activated })}
    ${iconPadding({ icon })}
  box-sizing: border-box;
    text-indent: 0;
  `
);

const InputElement = styled.input<StyledInputProps>`
  ${formFieldStyles}
  ${conditionalStyles}
  ${iconPadding}
  box-sizing: border-box;
  text-indent: 0;
`;

const StyledAlertIcon = styled(AlertIcon)(inputIconStyles);

const StyledCheckCircledIcon = styled(CheckCircledIcon)(inputIconStyles);

export const Input = forwardRef<HTMLInputElement, InputWrapperProps>(
  ({ error, className, id, valid, as: As, ...rest }, ref) => {
    const [activated, setActivated] = useState(false);
    const AsComponent = As || InputElement;

    return (
      <Box position="relative" onChange={() => setActivated(true)}>
        <AsComponent
          {...rest}
          id={id || rest.htmlFor}
          ref={ref}
          error={error}
          activated={activated}
          icon={error || valid}
          className={className}
        />
        {error && <StyledAlertIcon color="red" />}
        {valid && <StyledCheckCircledIcon color="green" />}
      </Box>
    );
  }
);

Input.defaultProps = {
  type: 'text',
};
