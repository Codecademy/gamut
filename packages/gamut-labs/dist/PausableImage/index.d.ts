import * as React from 'react';
interface PauseableImageProps {
    src: string;
    alt: string;
}
export declare const imageStyles: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme | undefined;
    as?: React.ElementType<any> | undefined;
}, React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, {}>;
export declare const PausableImage: React.FC<PauseableImageProps>;
export {};
