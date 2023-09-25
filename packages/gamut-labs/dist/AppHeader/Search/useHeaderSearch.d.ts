/// <reference types="react" />
export declare type AppHeaderSearch = {
    onEnable: () => void;
    onSearch: (query: string) => void;
    onTrackingClick: (target: string) => void;
};
export declare const useHeaderSearch: ({ onEnable, onSearch, onTrackingClick, }: AppHeaderSearch) => readonly [{
    readonly id: "search";
    readonly type: "render-element";
    readonly renderElement: () => JSX.Element;
}, JSX.Element];
