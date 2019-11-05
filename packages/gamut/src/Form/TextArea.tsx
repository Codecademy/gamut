import React, { TextareaHTMLAttributes } from 'react';
import cx from 'classnames';
import s from './styles/TextArea.scss';

export type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  className?: string;
  error?: boolean;
  htmlFor?: string;
  name?: string;
  required?: boolean;
  value?: string;
};

export const TextArea: React.FC<TextAreaProps> = ({
  error,
  htmlFor,
  className,
  ...rest
}) => {
  const classNames = cx(
    s.TextArea,
    {
      [s.error]: error,
    },
    className
  );

  return (
    <textarea
      {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
      id={htmlFor}
      className={classNames}
    />
  );
};

export default TextArea;
