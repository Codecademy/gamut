import React from 'react';
import { VisualTheme } from '@codecademy/gamut';
declare type TestimonialContent = {
    name: string;
    occupation: string;
    imageUrl?: string;
    quote: string;
};
declare type TestimonialProps = {
    testimonial?: TestimonialContent;
    size: 'small';
    theme: VisualTheme;
};
export declare const Testimonial: React.FC<TestimonialProps>;
export default Testimonial;
