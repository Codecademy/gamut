import { SVGProps, HTMLAttributes } from 'react';
import iconMap from './iconMap';
/**
 * @deprecated Directly import icons from @codecademy/gamut instead.
 */
export declare type IconPropsDeprecated = HTMLAttributes<SVGElement> & SVGProps<SVGSVGElement> & {
    height?: number;
    label?: string;
    name: keyof typeof iconMap;
    size?: number;
    width?: number;
};
/**
 * @deprecated Directly import icons from @codecademy/gamut instead.
 */
declare function Icon({ name, size, ...props }: IconPropsDeprecated): JSX.Element;
export default Icon;
