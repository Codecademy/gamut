import { AlertIcon, CheckCircledIcon } from '@codecademy/gamut-icons';
import styled from '@emotion/styled';
import React, { forwardRef, InputHTMLAttributes } from 'react';

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
};

const InputBase = styled.input<InputProps>`
  ${inputStyles}
  ${errorStyle}
`;

const StyledAlertIcon = styled(AlertIcon)`
  ${inputIconStyles}
`;

const StyledCheckCircledIcon = styled(CheckCircledIcon)`
  ${inputIconStyles}
`;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, htmlFor, className, id, verified, ...rest }, ref) => {
    return (
      <Box position="relative">
        <InputBase
          {...rest}
          id={id || htmlFor}
          ref={ref}
          error={error}
          className={className}
          errorState={error}
        />
        {error && <StyledAlertIcon color="red" />}
        {verified && <StyledCheckCircledIcon color="green" />}
      </Box>
    );
  }
);

Input.defaultProps = {
  type: 'text',
};
