import * as React from 'react';
export declare type RatingsBarProps = {
    /**
     * Minimum amount of the bar to fill in visually.
     */
    minimumPercent?: number;
    /**
     * How much of the bar to fill in, as a number in [0, 100].
     */
    percent: number;
};
export declare const RatingsBar: React.FC<RatingsBarProps>;
