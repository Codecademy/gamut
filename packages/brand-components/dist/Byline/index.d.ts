import React from 'react';
declare type BylineClassNamesProps = {
    bylineContainer?: string;
    author?: string;
    jobContainer?: string;
    location?: string;
};
export declare type BylineProps = {
    firstName: string;
    occupation: string;
    location?: string;
    classNames?: BylineClassNamesProps;
    company?: string;
    lastName?: string;
};
export declare const Byline: React.FC<BylineProps>;
export default Byline;
