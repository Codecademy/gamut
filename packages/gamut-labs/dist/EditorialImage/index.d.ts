import * as React from 'react';
export declare type EditorialImageProps = {
    /** The URL used for the image src */
    image: string;
    /** Alternative text for the image  */
    alt: string;
    /** An optional caption that will display below the image  */
    caption?: string;
};
export declare const EditorialImage: React.FC<EditorialImageProps>;
