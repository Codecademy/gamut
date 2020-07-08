import React from 'react';
export declare type HeaderContainerProps = {
    className?: string;
    sections?: {
        after?: React.ReactNode;
        left?: React.ReactNode;
        right?: React.ReactNode;
    };
};
export declare const HeaderContainer: React.FC<HeaderContainerProps>;
export default HeaderContainer;
