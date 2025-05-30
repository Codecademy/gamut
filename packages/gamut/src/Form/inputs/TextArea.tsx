import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';
import {
  ChangeEvent,
  forwardRef,
  TextareaHTMLAttributes,
  useState,
} from 'react';

import {
  conditionalStyles,
  conditionalStyleState,
  formFieldStyles,
} from '../styles';
import { BaseInputProps } from '../types';

export type TextWrapperProps = TextareaHTMLAttributes<HTMLTextAreaElement> &
  Omit<BaseInputProps, 'label'> & {
    className?: string;
    value?: string;
  };

export interface TextAreaProps
  extends TextWrapperProps,
    StyleProps<typeof conditionalStyles> {}

const StyledTextArea = styled.textarea<TextAreaProps>`
  ${formFieldStyles}
  ${conditionalStyles}
  position: initial;
  border-radius: 'md';
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
        className={className}
        id={id || rest.htmlFor}
        ref={ref}
        variant={conditionalStyleState(Boolean(error), activated)}
        onChange={(event) => changeHandler(event)}
      />
    );
  }
);
