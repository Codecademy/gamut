import React from 'react';
import { VisualTheme } from '@codecademy/gamut';
export declare type Testimonial = {
    firstName: string;
    lastName: string;
    occupation: string;
    quote: string;
    company?: string;
    imageUrl?: string;
};
declare type TestimonialProps = {
    testimonial: Testimonial;
    size: 'small' | 'medium' | 'large';
    theme: VisualTheme;
};
export declare const Testimonial: React.FC<TestimonialProps>;
export default Testimonial;
