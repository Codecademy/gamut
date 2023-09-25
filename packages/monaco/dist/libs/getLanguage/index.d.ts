import type { languages as LanguagesType } from 'monaco-editor';
import { LanguageId } from '../services/languageIds';
export declare type MonacoWithLanguages = {
    languages: {
        getLanguages(): LanguagesType.ILanguageExtensionPoint[];
    };
};
export declare const languageOverrides: Map<string, LanguageId>;
export declare const getLanguageForName: (monaco: MonacoWithLanguages, language: string) => string;
export declare const getLanguageForFile: (monaco: MonacoWithLanguages, fileName?: string | undefined) => string;
