import React from 'react';
import PropTypes from 'prop-types';
import Infinite from './Infinite';
import Finite from './Finite';

const propTypes = {
  size: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.oneOf(['infinite', 'finite']),
  duration: PropTypes.string,
};

const defaultProps = {
  size: '16px',
  type: 'infinite',
  duration: '1s',
};

function Spinner({ size, className, type, duration }) {
  const Tag = type === 'infinite' ? Infinite : Finite;

  return <Tag size={size} className={className} duration={duration} />;
}

Spinner.defaultProps = defaultProps;
Spinner.propTypes = propTypes;
export default Spinner;
