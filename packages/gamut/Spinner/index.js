import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import s from './styles';
import SpinnerIcon from './SpinnerIcon';

const Spinner = ({ size, className, fill}) => {
  const classNames = cx(s.spinner, className);
  return (
    <SpinnerIcon className={classNames} fill={fill} height={size} width={size} />
  );
};

Spinner.defaultProps = {
  size: '16px',
  fill: '#FFFFFF'
};

Spinner.propTypes = {
  size: PropTypes.string,
  className: PropTypes.string,
  fill: PropTypes.string
};

export default Spinner;
