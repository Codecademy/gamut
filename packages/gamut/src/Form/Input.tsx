import { AlertIcon, CheckCircledIcon } from '@codecademy/gamut-icons';
import { pxRem, theme } from '@codecademy/gamut-styles';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { uniqBy } from 'lodash';
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
    console.log(props);
    return (
      <Box position="relative">
        {children ? (
          <InputBase
            {...props}
            id={id || htmlFor}
            ref={ref}
            error={error}
            className={className}
          />
        ) : (
          <InputBase
            {...props}
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
