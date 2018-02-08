import React from 'react';
import PropTypes from 'prop-types';

export default function ChevronLeftIcon(props) {
  return (
    <svg {...props}>
      <title>Chevron Left Icon</title>
      <path
        d="M9.475 12.06l7.293 7.294-1.414 1.414-8.708-8.707 8.708-8.707 1.414 1.414z"
        fill={props.currentColor}
        fillRule="nonzero"
      />
    </svg>
  );
}

ChevronLeftIcon.propTypes = {
  currentColor: PropTypes.string,
};
