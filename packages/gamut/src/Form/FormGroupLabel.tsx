import cx from 'classnames';
import React, { HTMLAttributes } from 'react';

import styles from './styles/FormGroupLabel.module.scss';

export type FormGroupLabelProps = HTMLAttributes<HTMLDivElement> &
  HTMLAttributes<HTMLLabelElement> & {
    disabled?: boolean;
    htmlFor?: string;
  };

export const FormGroupLabel: React.FC<FormGroupLabelProps> = ({
  className,
  disabled,
  htmlFor,
  ...rest
}) => {
  const classNames = cx(
    styles.FormGroupLabel,
    disabled && styles.disabled,
    className
  );

  if (htmlFor) {
    return <label {...rest} htmlFor={htmlFor} className={classNames} />;
  }

  return <div {...rest} className={classNames} />;
};
