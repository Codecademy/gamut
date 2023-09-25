import { LanguageRegistration } from '../../libs/languageServices/types';
import { Editor } from '../types';
export declare const useDeltaDecorations: (editor?: Editor.IStandaloneCodeEditor | undefined, registration?: LanguageRegistration | undefined) => string[] | undefined;
