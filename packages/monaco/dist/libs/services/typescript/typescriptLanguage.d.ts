import type { languages } from 'monaco-editor';
export declare const createConfiguration: (monaco: typeof import('monaco-editor')) => languages.LanguageConfiguration;
export declare const primitives: string[];
export declare const definition: {
    defaultToken: string;
    tokenPostfix: string;
    keywords: string[];
    primitives: string[];
    typeKeywords: string[];
    operators: string[];
    symbols: RegExp;
    escapes: RegExp;
    digits: RegExp;
    octaldigits: RegExp;
    binarydigits: RegExp;
    hexdigits: RegExp;
    regexpctl: RegExp;
    regexpesc: RegExp;
    whitespace: RegExp;
    validName: RegExp;
    tokenizer: {
        root: {
            include: string;
        }[];
        common: ((string | RegExp)[] | {
            include: string;
            regex?: undefined;
            action?: undefined;
        } | (RegExp | {
            token: string;
            next: string;
        })[] | {
            regex: RegExp;
            action: ({
                token: string;
                next?: undefined;
            } | {
                token: string;
                next: string;
            })[];
            include?: undefined;
        } | (RegExp | string[])[] | (RegExp | {
            cases: {
                '@typeKeywords': string;
                '@keywords': string;
                '@primitives': string;
                '@default': string;
            };
        })[] | (RegExp | {
            token: string;
            bracket: string;
            next: string;
        })[] | (RegExp | {
            cases: {
                '@operators': string;
                '@default': string;
            };
        })[])[];
        tag: ((string | RegExp)[] | (RegExp | {
            token: string;
            next: string;
        })[] | {
            include: string;
        })[];
        propValue: ({
            include: string;
        } | (RegExp | {
            token: string;
            next: string;
        })[])[];
        innerTag: ((string | RegExp)[] | (RegExp | {
            token: string;
            next: string;
        })[])[];
        whitespace: (string | RegExp)[][];
        comment: (string | RegExp)[][];
        jsdoc: (string | RegExp)[][];
        numbers: (string | RegExp)[][];
        strings: (string | RegExp)[][];
        regexp: ((string | RegExp)[] | (RegExp | (string | {
            token: string;
            next: string;
        })[])[] | (RegExp | (string | {
            token: string;
            bracket: string;
            next: string;
        })[])[])[];
        regexrange: ((string | RegExp)[] | (RegExp | {
            token: string;
            next: string;
            bracket: string;
        })[])[];
        string_double: (string | RegExp)[][];
        string_single: (string | RegExp)[][];
        string_backtick: (string | RegExp)[][];
        definitions: ((string | RegExp)[] | {
            include: string;
            regex?: undefined;
            action?: undefined;
        } | (RegExp | {
            token: string;
            goBack: number;
            next: string;
        })[] | {
            regex: RegExp;
            action: ({
                token: string;
                next?: undefined;
            } | {
                token: string;
                next: string;
            })[];
            include?: undefined;
        })[];
        functionDefinitions: (string | RegExp)[][];
        varDefinition: ((string | RegExp)[] | {
            include: string;
        } | (RegExp | {
            token: string;
            switchTo: string;
        })[] | (RegExp | {
            token: string;
            goBack: number;
            next: string;
        })[])[];
        varValue: ((string | RegExp)[] | {
            include: string;
        } | (RegExp | {
            token: string;
            switchTo: string;
        })[] | (RegExp | {
            token: string;
            next: string;
        })[] | (RegExp | {
            token: string;
            goBack: number;
            next: string;
        })[])[];
        functionDefinition: ((string | RegExp)[] | {
            include: string;
        } | (RegExp | {
            token: string;
            switchTo: string;
        })[])[];
        functionValue: ((string | RegExp)[] | {
            include: string;
        })[];
        loopDefinition: ((string | RegExp)[] | {
            include: string;
        })[];
        classDefinition: {
            include: string;
        }[];
        arrayBracketCounting: ((string | RegExp)[] | {
            include: string;
        })[];
        bracketCounting: ((string | RegExp)[] | {
            include: string;
        })[];
        bracketCountingProperty: ((string | RegExp)[] | {
            include: string;
        })[];
        property: ((string | RegExp)[] | {
            include: string;
        })[];
        propertyValue: ((string | RegExp)[] | (RegExp | {
            token: string;
            goBack: number;
            next: string;
        })[] | {
            include: string;
        })[];
        propertyFuncValue: ((string | RegExp)[] | (RegExp | {
            token: string;
            switchTo: string;
        })[] | {
            include: string;
        })[];
        attribute: ((string | RegExp)[] | (RegExp | {
            token: string;
            goBack: number;
            next: string;
        })[])[];
    };
};
