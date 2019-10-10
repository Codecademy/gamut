import { ReactNode } from 'react';
export declare type CardFooterProps = {
    align?: 'center' | 'left' | 'right';
    border?: 'dashed' | 'none' | 'solid';
    children: ReactNode;
    className?: string;
    flex?: boolean;
    standardHeight?: boolean;
    standardPadding?: boolean;
};
declare const CardFooter: {
    ({ children, border, align, flex, standardPadding, standardHeight, className, }: CardFooterProps): JSX.Element;
    defaultProps: {
        border: string;
        align: string;
        flex: boolean;
        standardPadding: boolean;
        standardHeight: boolean;
    };
};
export default CardFooter;
