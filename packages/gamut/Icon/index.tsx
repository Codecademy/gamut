import React, { SVGProps, HTMLAttributes } from 'react';
import iconMap from './iconMap';

const defaultProps = {
  height: 24,
  width: 24,
};

export type IconProps = HTMLAttributes<SVGElement> &
  SVGProps<SVGSVGElement> & {
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

Icon.defaultProps = defaultProps;

export default Icon;
