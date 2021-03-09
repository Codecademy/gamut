import styled from '@emotion/styled';
import React, { forwardRef, TextareaHTMLAttributes, useState } from 'react';

import { Box } from '../Box';
import { conditionalStyles, formFieldStyles } from './styles/shared';

export type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  className?: string;
  activated?: boolean;
  error?: boolean;
  htmlFor?: string;
  name?: string;
  required?: boolean;
  value?: string;
};

const StyledTextArea = styled.textarea`
  ${formFieldStyles}
  ${conditionalStyles}
  position: initial;
`;

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ error, className, id, ...rest }, ref) => {
    const [activated, setActivated] = useState(false);
    return (
      <Box onChange={() => setActivated(true)}>
        <StyledTextArea
          {...rest}
          id={id || rest.htmlFor}
          className={className}
          ref={ref}
          error={error}
          activated={activated}
        />
      </Box>
    );
  }
);
