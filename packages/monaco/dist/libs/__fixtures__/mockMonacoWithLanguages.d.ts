export declare const mockLanguagesInMonaco: ({
    id: string;
    extensions: string[];
    extends?: undefined;
} | {
    id: string;
    extends: string[];
    extensions?: undefined;
})[];
export declare const mockMonacoWithLanguages: {
    languages: {
        getLanguages: () => ({
            id: string;
            extensions: string[];
            extends?: undefined;
        } | {
            id: string;
            extends: string[];
            extensions?: undefined;
        })[];
    };
};
