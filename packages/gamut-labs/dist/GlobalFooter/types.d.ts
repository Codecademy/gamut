import React from 'react';
declare type GlobalFooterClickData = {
    /**
     * Native event from the data that can be .preventDefault()ed.
     */
    event: React.MouseEvent;
    /**
     * Data tracking target, such as 'about' or 'policy'.
     */
    target: string;
};
export declare type GlobalFooterClickHandler = (data: GlobalFooterClickData) => void;
export {};
