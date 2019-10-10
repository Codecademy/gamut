import { ReactNode } from 'react';
export declare type CardShellProps = {
    children: ReactNode;
    className?: string;
    hoverShadow?: boolean;
    style?: object;
    id?: string;
    role?: string;
};
declare const CardShell: {
    ({ children, hoverShadow, className, style, role, id, }: CardShellProps): JSX.Element;
    defaultProps: {
        hoverShadow: boolean;
    };
};
export default CardShell;
