import React, { ReactNode, HTMLAttributes } from 'react';
import cx from 'classnames';
import s from './styles/FormGroup.scss';
import FormGroupDescription from './FormGroupDescription';
import FormGroupLabel from './FormGroupLabel';

export type FormGroupProps = HTMLAttributes<HTMLDivElement> & {
  label?: string;
  htmlFor?: string;
  className?: string;
  description?: string;
  children: ReactNode | ReactNode[];
};

const FormGroup = ({
  label,
  description,
  htmlFor,
  children,
  className,
  ...rest
}: FormGroupProps) => {
  const classNames = cx(s.FormGroup, className);

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

export default FormGroup;
