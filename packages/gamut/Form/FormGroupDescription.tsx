import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import s from './styles/FormGroupDescription.scss';

export type FormGroupDescriptionProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

const FormGroupDescription = (props: FormGroupDescriptionProps) => {
  const className = cx(s.FormGroupDescription, props.className);
  return <div {...props} className={className} />;
};

FormGroupDescription.propTypes = {
  className: PropTypes.string,
};

export default FormGroupDescription;
