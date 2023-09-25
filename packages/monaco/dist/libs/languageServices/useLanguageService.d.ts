import type { editor as Editor } from 'monaco-editor';
import { LanguageRegistration } from './types';
export declare type LanguageService = {
    id?: string;
    registration?: LanguageRegistration;
};
declare const useLanguageService: (fileName: string, editor?: Editor.IStandaloneCodeEditor | undefined, monaco?: typeof import("monaco-editor") | undefined) => LanguageService;
export default useLanguageService;
