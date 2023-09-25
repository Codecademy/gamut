import * as React from 'react';
export declare type SearchPaneProps = {
    onSearch: (query: string) => void;
    onTrackingClick: (target: string) => void;
    toggleSearch: () => void;
};
export declare const SearchPane: React.FC<SearchPaneProps>;
