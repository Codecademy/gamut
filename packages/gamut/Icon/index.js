import React from 'react';
import PropTypes from 'prop-types';
import iconMap from './iconMap';

const propTypes = {
  label: PropTypes.string,
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
  if (!iconMap[name]) return null;
  const MappedIcon = iconMap[name];
  const { label, ...childProps } = props;

  if (label) {
    childProps['aria-label'] = label;
  }

  if (size) {
    childProps.width = size;
    childProps.height = size;
  }

  return (
    <MappedIcon
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      {...childProps}
    />
  );
}

Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;

export default Icon;
