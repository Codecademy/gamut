import React, { HTMLAttributes } from 'react';
import cx from 'classnames';
import styles from './styles/FormGroup.module.scss';
import { FormGroupDescription } from './FormGroupDescription';
import { FormGroupLabel } from './FormGroupLabel';

export type FormGroupProps = HTMLAttributes<HTMLDivElement> & {
  label?: string;
  htmlFor?: string;
  className?: string;
  description?: string;
};

export const FormGroup: React.FC<FormGroupProps> = ({
  label,
  description,
  htmlFor,
  children,
  className,
  ...rest
}) => {
  const classNames = cx(styles.FormGroup, className);

  const labelComponent = label ? (
    <FormGroupLabel htmlFor={htmlFor}>{label}</FormGroupLabel>
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
