import type { editor as Editor } from 'monaco-editor';
export declare type Monaco = typeof import('monaco-editor');
export declare type LanguageCreatorImporter<Framework> = () => Promise<{
    default: LanguageCreator<Framework>;
}>;
export declare type LanguageCreator<Framework> = (framework: Framework) => LanguageRegistration;
export declare type ValidateSyntax = (text: string) => Editor.IModelDeltaDecoration[];
export declare type LanguageRegistration = {
    validateSyntax?: ValidateSyntax;
};
