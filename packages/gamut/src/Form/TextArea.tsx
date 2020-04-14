import React, { TextareaHTMLAttributes } from 'react';
import cx from 'classnames';
import s from './styles/TextArea.module.scss';

export type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  className?: string;
  error?: boolean;
  htmlFor?: string;
  name?: string;
  required?: boolean;
  value?: string;
};

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ error, htmlFor, className, ...rest }, ref) => {
    const classNames = cx(
      s.TextArea,
      {
        [s.error]: error,
      },
      className
    );

    return <textarea {...rest} id={htmlFor} className={classNames} ref={ref} />;
  }
);

export default TextArea;
