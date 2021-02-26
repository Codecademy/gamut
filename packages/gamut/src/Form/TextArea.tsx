import styled from '@emotion/styled';
import cx from 'classnames';
import React, { forwardRef, TextareaHTMLAttributes } from 'react';

import { errorStyle, formBaseFieldStyles } from './styles/shared';
import styles from './styles/TextArea.module.scss';

export type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  className?: string;
  error?: boolean;
  htmlFor?: string;
  name?: string;
  required?: boolean;
  value?: string;
};

const StyledTextArea = styled.textarea`
  ${formBaseFieldStyles}
  ${errorStyle}
  position: initial;
`;

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ error, htmlFor, className, id, ...rest }, ref) => {
    const classNames = cx(
      styles.TextArea,
      {
        [styles.error]: error,
      },
      className
    );

    return (
      <StyledTextArea
        {...rest}
        id={id || htmlFor}
        className={className}
        ref={ref}
        errorState={error}
      />
    );
  }
);
