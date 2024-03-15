import React from 'react';
export interface BaseImageProps {
    alt: string;
    src: string;
}
export declare const Container: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme | undefined;
    as?: React.ElementType<any> | undefined;
}, React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
export declare const PlayingImage: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme | undefined;
    as?: React.ElementType<any> | undefined;
}, React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, {}>;
export declare const BaseImage: React.FC<BaseImageProps>;
export default BaseImage;
