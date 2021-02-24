import styled from '@emotion/styled';
import React, { forwardRef, InputHTMLAttributes } from 'react';

import { inputStyles } from './shared';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  error?: boolean;
  htmlFor?: string;
  label?: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
};

const InputBase = styled.input<InputProps>`
  ${inputStyles}
`;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, htmlFor, className, id, ...rest }, ref) => {
    return (
      <InputBase {...rest} id={id || htmlFor} ref={ref} className={className} />
    );
  }
);

Input.defaultProps = {
  type: 'text',
};
