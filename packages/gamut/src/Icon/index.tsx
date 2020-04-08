import React, { SVGProps, HTMLAttributes } from 'react';
import iconMap from './iconMap';

/**
 * @deprecated Directly import icons from @codecademy/gamut-icons instead.
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
 * @deprecated Directly import icons from @codecademy/gamut-icons instead.
 */
export function Icon({ name, size, ...props }: IconPropsDeprecated) {
  const MappedIcon = iconMap[name];
  const { label, ...iconProps } = props;

  if (label) {
    iconProps['aria-label'] = label;
  }

  if (size) {
    iconProps.width = size;
    iconProps.height = size;
  }

  return <MappedIcon {...iconProps} />;
}

export default Icon;
