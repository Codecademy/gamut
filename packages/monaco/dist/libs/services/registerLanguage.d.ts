import type { languages } from 'monaco-editor';
import { LanguageId } from './languageIds';
export declare const registerLanguage: (monaco: typeof import('monaco-editor'), languageId: LanguageId, languageConfiguration: languages.LanguageConfiguration, languageDefinition: languages.IMonarchLanguage) => void;
