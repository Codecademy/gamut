import React from 'react';
import PropTypes from 'prop-types';

export default function ChevronUpIcon(props) {
  return (
    <svg {...props}>
      <title>Chevron Up Icon</title>
      <path
        d="M20.293 18.414L21.707 17 12 7.293 2.293 17l1.414 1.414L12 10.121z"
        fill={props.currentColor}
        fillRule="nonzero"
      />
    </svg>
  );
}

ChevronUpIcon.propTypes = {
  currentColor: PropTypes.string,
};
