import React, { HTMLAttributes } from 'react';
import cx from 'classnames';
import s from './styles/TextArea.scss';

export type TextAreaProps = HTMLAttributes<HTMLTextAreaElement> & {
  className?: string;
  error?: boolean;
  htmlFor?: string;
  name?: string;
  required?: boolean;
  rows?: number | string;
  value?: string;
};

const TextArea = ({ error, htmlFor, className, ...rest }: TextAreaProps) => {
  const classNames = cx(
    s.TextArea,
    {
      [s.error]: error,
    },
    className
  );

  return (
    <textarea
      {...(rest as HTMLAttributes<HTMLTextAreaElement>)}
      id={htmlFor}
      className={classNames}
    />
  );
};

export default TextArea;
