import React from 'react';
import PropTypes from 'prop-types';

export default function ChevronDownIcon(props) {
  return (
    <svg {...props}>
      <title>Chevron Down Icon</title>
      <path
        d="M20.293 7.293l1.414 1.414L12 18.414 2.293 8.707l1.414-1.414L12 15.586z"
        fill={props.currentColor}
        fillRule="nonzero"
      />
    </svg>
  );
}

ChevronDownIcon.propTypes = {
  currentColor: PropTypes.string,
};
