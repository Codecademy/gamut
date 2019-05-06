import React, { SVGProps, HTMLAttributes } from 'react';
import iconMap from './iconMap';

const defaultProps = {
  height: 24,
  width: 24,
};

/**
 * @deprecated Directly import icons from @codecademy/gamut instead.
 */
export type IconPropsDeprecated = HTMLAttributes<SVGElement> &
  SVGProps<SVGSVGElement> & {
    height?: number;
    label?: string;
    name: keyof typeof iconMap;
    size?: number;
    width?: number;
  };

/**
 * @deprecated Directly import icons from @codecademy/gamut instead.
 */
function Icon({ name, size, ...props }: IconPropsDeprecated) {
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
      height={childProps.height}
      svgProps={childProps}
      width={childProps.width}
    />
  );
}

Icon.defaultProps = defaultProps;

export default Icon;
