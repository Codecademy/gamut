import React from 'react';
import { SectionButton } from '..';
export declare type ListSectionProps = {
    title: string;
    headerButton?: SectionButton;
    headerSecondaryButton?: SectionButton;
    /**
     * Number of items to be initally displayed
     *
     * @remarks
     * If the initial display amount matches the number of list items, Show All button will not appear.
     */
    initialDisplayAmount?: number;
    /**
     * Optional callback function that will be called when the user clicks the "Show All" / "Show less" button.
     * This is usually used for things like metrics tracking.
     */
    onShowAllOrLessClick?: (showAll: boolean) => void;
};
export declare const ListSection: React.FC<ListSectionProps>;
