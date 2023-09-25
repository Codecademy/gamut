export declare type RawValidationComplaint = {
    col: number;
    line: number;
    message: string;
};
export declare const formatValidationComplaint: (rawComplaint: RawValidationComplaint) => {
    options: {
        className: import("@emotion/react").SerializedStyles;
        glyphMarginClassName: import("@emotion/react").SerializedStyles;
        glyphMarginHoverMessage: {
            value: string;
        };
        hoverMessage: {
            value: string;
        };
        inlineClassName: import("@emotion/react").SerializedStyles;
        overflowRuler: boolean;
    };
    range: {
        endColumn: number;
        endLineNumber: number;
        startColumn: number;
        startLineNumber: number;
    };
};
