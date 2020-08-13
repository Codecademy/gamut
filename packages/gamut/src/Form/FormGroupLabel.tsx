import React, { HTMLAttributes } from 'react';
import cx from 'classnames';
import s from './styles/FormGroupLabel.module.scss';

export type FormGroupLabelProps = FormGroupLabelPropsWithFor &
  FormGroupLabelPropsPlain;

export type FormGroupLabelPropsWithFor = HTMLAttributes<HTMLLabelElement> & {
  className?: string;
  htmlFor?: string;
};

export type FormGroupLabelPropsPlain = HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

export const FormGroupLabel: React.FC<FormGroupLabelProps> = ({
  htmlFor,
  className,
  ...rest
}) => {
  const classNames = cx(s.FormGroupLabel, className);

  if (htmlFor) {
    return <label {...rest} htmlFor={htmlFor} className={classNames} />;
  }

  return <div {...rest} className={classNames} />;
};
