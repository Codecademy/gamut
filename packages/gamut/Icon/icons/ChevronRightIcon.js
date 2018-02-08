import React from 'react';
import PropTypes from 'prop-types';

export default function ChevronRightIcon(props) {
  return (
    <svg {...props}>
      <title>Chevron Right Icon</title>
      <path
        d="M13.94 12.06L6.645 4.769l1.415-1.414 8.707 8.707-8.707 8.707-1.415-1.414z"
        fill={props.currentColor}
        fillRule="nonzero"
      />
    </svg>
  );
}

ChevronRightIcon.propTypes = {
  currentColor: PropTypes.string,
};
