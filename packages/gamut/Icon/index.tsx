import React from 'react';
import PropTypes from 'prop-types';
import iconMap from './iconMap';

const propTypes = {
  height: PropTypes.number,
  label: PropTypes.string,
  name: PropTypes.oneOf(Object.keys(iconMap)).isRequired,
  size: PropTypes.number,
  width: PropTypes.number,
};

const defaultProps = {
  height: 24,
  width: 24,
};

export type IconProps = {
  height?: number;
  label?: string;
  name: keyof typeof iconMap;
  size?: number;
  width?: number;
};

function Icon({ name, size, ...props }: IconProps) {
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
