import * as React from 'react';
export interface GamutIconProps extends React.SVGProps<SVGSVGElement> {
    size?: number;
    title?: string;
    color?: string;
}
declare const SvgGlasses: ({ title, size, color, width, height, ...props }: GamutIconProps) => JSX.Element;
export default SvgGlasses;
