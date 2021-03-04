import styled from '@emotion/styled';
import React, { forwardRef, TextareaHTMLAttributes } from 'react';

import { errorStyle, formFieldStyles } from './styles/shared';

export type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  className?: string;
  error?: boolean;
  htmlFor?: string;
  name?: string;
  required?: boolean;
  value?: string;
};

const StyledTextArea = styled.textarea`
  ${formFieldStyles}
  ${errorStyle}
  position: initial;
`;

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ error, htmlFor, className, id, ...rest }, ref) => {
    return (
      <StyledTextArea
        {...rest}
        id={id || htmlFor}
        className={className}
        ref={ref}
        error={error}
      />
    );
  }
);
