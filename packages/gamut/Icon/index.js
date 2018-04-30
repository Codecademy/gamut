import React from 'react';
import PropTypes from 'prop-types';
import iconMap from './iconMap';

const propTypes = {
  name: PropTypes.oneOf(Object.keys(iconMap)).isRequired,
  size: PropTypes.number,
  height: PropTypes.number,
  width: PropTypes.number,
};

const defaultProps = {
  height: 24,
  width: 24,
};

function Icon({ name, size, ...props }) {
  const MappedIcon = iconMap[name];

  if (size) {
    props.width = size;
    props.height = size;
  }

  return (
    <MappedIcon
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby="title"
      version="1.1"
      {...props}
    />
  );
}

Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;

export default Icon;
