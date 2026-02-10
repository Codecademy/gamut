import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';
import {
  ChangeEvent,
  forwardRef,
  ForwardRefExoticComponent,
  RefAttributes,
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

/** React 19 ref compat: Omit ref so forwardRef is the single source (see typings/react-19-compat.d.ts). */
export const TextArea = forwardRef<
  HTMLTextAreaElement | null,
  Omit<TextWrapperProps, 'ref'>
>(({ error, className, id, ...rest }, ref) => {
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
}) as ForwardRefExoticComponent<
  TextAreaProps & RefAttributes<HTMLTextAreaElement | null>
>;
