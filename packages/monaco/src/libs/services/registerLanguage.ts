import type { languages } from 'monaco-editor';

import { LanguageId } from './languageIds';

export const registerLanguage = (
  monaco: typeof import('monaco-editor'),
  languageId: LanguageId,
  languageConfiguration: languages.LanguageConfiguration,
  languageDefinition: languages.IMonarchLanguage
) => {
  monaco.languages.register({ id: languageId });
  monaco.languages.setLanguageConfiguration(languageId, languageConfiguration);
  monaco.languages.setMonarchTokensProvider(languageId, languageDefinition);
};
