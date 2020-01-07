import React from 'react';
import iconMap from './iconMap';

/**
 * @deprecated Directly import icons from @codecademy/gamut instead.
 */
export type IconPropsDeprecated = React.SVGProps<SVGSVGElement> & {
  height?: number;
  label?: string;
  name: keyof typeof iconMap;
  size?: number;
  width?: number;
  ref?: React.Ref<SVGSVGElement>;
};

/**
 * @deprecated Directly import icons from @codecademy/gamut instead.
 */
export function Icon({ name, ...props }: IconPropsDeprecated) {
  const MappedIcon = iconMap[name];
  const { label, ...iconProps } = props;

  return <MappedIcon {...iconProps} title={label} />;
}

export default Icon;
