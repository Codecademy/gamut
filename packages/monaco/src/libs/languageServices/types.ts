import type { editor as Editor } from 'monaco-editor';

export type Monaco = typeof import('monaco-editor');

export type LanguageCreatorImporter<Framework> = () => Promise<{
  default: LanguageCreator<Framework>;
}>;

export type LanguageCreator<Framework> = (
  framework: Framework
) => LanguageRegistration;

export type ValidateSyntax = (text: string) => Editor.IModelDeltaDecoration[];

export type LanguageRegistration = {
  validateSyntax?: ValidateSyntax;
};
