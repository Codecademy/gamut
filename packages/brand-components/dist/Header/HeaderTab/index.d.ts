import React, { HTMLAttributes } from 'react';
export declare type HeaderTabProps = HTMLAttributes<HTMLElement> & {
    className?: string;
    id?: string;
    testId?: string;
};
export declare const HeaderTab: React.FC<HeaderTabProps>;
export default HeaderTab;
