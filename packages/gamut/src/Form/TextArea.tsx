import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';
import React, {
  ChangeEvent,
  forwardRef,
  TextareaHTMLAttributes,
  useState,
} from 'react';

import {
  conditionalStyles,
  conditionalStyleState,
  formFieldStyles,
} from './styles/shared-system-props';

export type TextWrapperProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  className?: string;
  error?: boolean;
  htmlFor?: string;
  name?: string;
  required?: boolean;
  value?: string;
};

export interface TextAreaProps
  extends TextWrapperProps,
    StyleProps<typeof conditionalStyles> {}

const StyledTextArea = styled.textarea<TextAreaProps>`
  ${formFieldStyles}
  ${conditionalStyles}
  position: initial;
`;

export const TextArea = forwardRef<HTMLTextAreaElement, TextWrapperProps>(
  ({ error, className, id, ...rest }, ref) => {
    const [activated, setActivated] = useState(false);

    const changeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
      rest?.onChange?.(event);
      setActivated(true);
    };

    return (
      <StyledTextArea
        {...rest}
        id={id || rest.htmlFor}
        className={className}
        ref={ref}
        variant={conditionalStyleState(Boolean(error), activated)}
        onChange={(event) => changeHandler(event)}
      />
    );
  }
);
