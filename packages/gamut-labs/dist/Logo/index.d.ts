import { SVGProps } from 'react';
export declare type LogoType = 'default' | 'pro' | 'proAlt' | 'proLockup' | 'program' | 'proMono' | 'premium';
export declare type LogoProps = SVGProps<SVGSVGElement> & {
    height?: number;
    width?: number;
    type: LogoType;
};
export declare function Logo({ type, ...props }: LogoProps): JSX.Element;
export declare namespace Logo {
    var defaultProps: LogoProps;
}
