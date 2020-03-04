import React from 'react';
declare type BylineClassNamesProps = {
    bylineContainer?: string;
    name?: string;
    occupation?: string;
    location?: string;
};
export declare type BylineProps = {
    name: string;
    occupation: string;
    location?: string;
    classNames?: BylineClassNamesProps;
};
export declare const Byline: React.FC<BylineProps>;
export default Byline;
