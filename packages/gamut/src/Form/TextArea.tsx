import styled from '@emotion/styled';
import React, {
  ChangeEvent,
  forwardRef,
  TextareaHTMLAttributes,
  useState,
} from 'react';

import { conditionalStyles, formFieldStyles } from './styles/shared';

export type TextWrapperProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  className?: string;
  error?: boolean;
  htmlFor?: string;
  name?: string;
  required?: boolean;
  value?: string;
};

export type TextAreaProps = TextWrapperProps & {
  activated?: boolean;
};

const StyledTextArea = styled.textarea<TextAreaProps>`
  ${formFieldStyles}
  ${conditionalStyles}
  position: initial;
`;

export const TextArea = forwardRef<HTMLTextAreaElement, TextWrapperProps>(
  ({ error, className, id, ...rest }, ref) => {
    const [activated, setActivated] = useState(false);

    const changeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
      rest.onChange ? rest.onChange(event) : null;
      setActivated(true);
    };

    return (
      <StyledTextArea
        {...rest}
        id={id || rest.htmlFor}
        className={className}
        ref={ref}
        error={error}
        activated={activated}
        onChange={(event) => changeHandler(event)}
      />
    );
  }
);
