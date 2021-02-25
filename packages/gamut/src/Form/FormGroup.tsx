import cx from 'classnames';
import React, { HTMLAttributes } from 'react';

import { FormGroupDescription } from './FormGroupDescription';
import { FormGroupLabel } from './FormGroupLabel';
import styles from './styles/FormGroup.module.scss';

export type FormGroupProps = HTMLAttributes<HTMLDivElement> & {
  label?: string;
  htmlFor?: string;
  className?: string;
  description?: string;
  required?: boolean;
};

export const FormGroup: React.FC<FormGroupProps> = ({
  label,
  description,
  htmlFor,
  children,
  className,
  required,
  ...rest
}) => {
  const classNames = cx(styles.FormGroup, className);

  const labelComponent = label ? (
    <FormGroupLabel htmlFor={htmlFor} required={required}>
      {label}
    </FormGroupLabel>
  ) : null;

  const descriptionComponent = description ? (
    <FormGroupDescription aria-live="assertive">
      {description}
    </FormGroupDescription>
  ) : null;

  return (
    <div {...rest} className={classNames}>
      {labelComponent}
      {descriptionComponent}
      {children}
    </div>
  );
};
