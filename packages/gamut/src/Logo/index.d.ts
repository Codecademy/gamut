import { SVGProps } from 'react';
export declare type LogoProps = SVGProps<SVGSVGElement> & {
    height?: number;
    width?: number;
    type: 'default' | 'pro' | 'proAlt' | 'proLockup' | 'program';
};
declare function Logo({ type, ...props }: LogoProps): JSX.Element;
declare namespace Logo {
    var defaultProps: {
        height: number;
        type: string;
    };
}
export default Logo;
