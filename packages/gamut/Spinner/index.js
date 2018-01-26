import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import s from './styles';
import SpinnerIcon from './SpinnerIcon';
import SpinnerIconV2 from './SpinnerIconV2';

const Spinner = ({ size, className, fill, v2 }) => {
  // const classNames = cx(s.spinner, className);
  const classNames = cx(className);

  if (v2) {
    return (
      <SpinnerIconV2
        className={classNames}
        fill={fill}
        height={size}
        width={size}
      />
    );
  }

  return (
    <SpinnerIcon
      className={classNames}
      fill={fill}
      height={size}
      width={size}
    />
  );
};

Spinner.defaultProps = {
  size: '16px',
  fill: '#FFFFFF',
};

Spinner.propTypes = {
  size: PropTypes.string,
  className: PropTypes.string,
  fill: PropTypes.string,
  v2: PropTypes.bool,
};

export default Spinner;
