import React from 'react';
import cx from 'classnames';
import s from './styles/FormGroupDescription.module.scss';

export type FormGroupDescriptionProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

export const FormGroupDescription: React.FC<FormGroupDescriptionProps> = (
  props
) => {
  const className = cx(s.FormGroupDescription, props.className);
  return <div {...props} className={className} />;
};

export default FormGroupDescription;
