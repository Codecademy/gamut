import { SVGProps, FunctionComponent } from 'react';
export interface RadialProgressProps extends SVGProps<SVGSVGElement> {
    size?: number;
    duration?: number;
    value?: number | number[];
    strokeWidth?: number | string;
    strokeLinecap?: 'round' | 'butt' | 'square';
}
declare const RadialProgress: FunctionComponent<RadialProgressProps>;
export default RadialProgress;
