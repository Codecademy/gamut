import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  size: PropTypes.string,
  className: PropTypes.string,
  duration: PropTypes.string,
};

function Spinner({ size, className, duration }) {
  return (
    <svg viewBox="0 0 100 100" height={size} width={size} className={className}>
      <circle
        cx="50"
        cy="50"
        r="40"
        stroke="orange"
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
        opacity=".2"
      />
      <circle
        cx="50"
        cy="50"
        r="40"
        stroke="orange"
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
        opacity="1"
        strokeDashoffset="260"
        strokeDasharray="260"
        transform="rotate(-90 50 50)"
      >
        <animate
          attributeType="CSS"
          attributeName="stroke-dashoffset"
          from="260"
          to="10"
          dur={duration}
          begin="0"
          fill="freeze"
        />
      </circle>
    </svg>
  );
}

Spinner.propTypes = propTypes;
export default Spinner;
