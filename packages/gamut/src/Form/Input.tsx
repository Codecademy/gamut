import { AlertIcon, CheckCircledIcon } from '@codecademy/gamut-icons';
import { css, jsx } from '@emotion/react';
import styled from '@emotion/styled';
import React, { forwardRef, InputHTMLAttributes, ReactNode } from 'react';

import { Box } from '../Box';
import { errorStyle, inputIconStyles, inputStyles } from './styles/shared';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  error?: boolean;
  htmlFor?: string;
  label?: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
  errorState?: boolean;
  verified?: boolean;
  reactRecurlyComponent?: ReactNode;
};

const InputBase = styled.input<InputProps>`
  ${inputStyles}
  ${errorStyle}
`;

const InputBaseStyles = css`
  ${inputStyles}
  ${errorStyle}
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

const StyledAlertIcon = styled(AlertIcon)`
  ${inputIconStyles}
`;

const StyledCheckCircledIcon = styled(CheckCircledIcon)`
  ${inputIconStyles}
`;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      error,
      htmlFor,
      className,
      id,
      verified,
      children,
      reactRecurlyComponent,
      ...rest
    },
    ref
  ) => {
    return (
      <Box position="relative">
        {console.log(children)}
        {reactRecurlyComponent ? (
          <RRWrapper
            inputProps={{ error, htmlFor, id, verified, ...rest, ref }}
          >
            {reactRecurlyComponent}
          </RRWrapper>
        ) : (
          <InputBase
            {...rest}
            id={id || htmlFor}
            ref={ref}
            error={error}
            className={className}
            errorState={error}
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
