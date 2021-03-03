import { AlertIcon, CheckCircledIcon } from '@codecademy/gamut-icons';
import { pxRem, theme } from '@codecademy/gamut-styles';
import { css, jsx } from '@emotion/react';
import styled from '@emotion/styled';
import React, { forwardRef, InputHTMLAttributes, ReactNode } from 'react';

import { Box } from '../Box';
import { errorStyle, formBaseFieldStyles, iconStyles } from './styles/shared';

export type CustomInputChild = ReactNode & {
  props?: ReactNode;
};

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  error?: boolean;
  htmlFor?: string;
  label?: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
  verified?: boolean;
  children?: CustomInputChild;
};

const inputIconStyles = css`
  ${iconStyles}
  top: calc(50% - (${pxRem(8)} + ${theme.spacing[4]}));
`;
const InputBaseStyles = css`
  ${formBaseFieldStyles}
  ${errorStyle}
  box-sizing: border-box;
  text-indent: 0;
`;

const cloneElement = (element, props) =>
  jsx(element.type, {
    key: element.key,
    ref: element.ref,
    ...element.props,
    ...props,
  });

const RRWrapper = ({ children, inputProps }) => {
  const props = { ...children.props, ...inputProps };
  return cloneElement(children, { ...props, css: InputBaseStyles });
};

const InputBase = styled.input<InputProps>`
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

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, htmlFor, className, id, verified, children, ...rest }, ref) => {
    const props = children ? { ...rest, ...children.props } : rest;
    return (
      <Box position="relative">
        {children ? (
          <RRWrapper
            inputProps={{ error, htmlFor, id, verified, ...props, ref }}
          >
            {children}
          </RRWrapper>
        ) : (
          <InputBase
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
