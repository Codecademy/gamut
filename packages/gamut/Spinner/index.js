import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import s from './styles';

const SpinnerIcon = require('./SpinnerIcon');

const Spinner = (props) => {
  const { size, className, fill } = props;
  const styles = cx(s.spinner, className);
  return (
    <SpinnerIcon className={styles} fill={fill} height={size} width={size} />
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
