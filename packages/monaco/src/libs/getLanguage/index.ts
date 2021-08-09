import type { languages as LanguagesType } from 'monaco-editor';

import { LanguageId } from '../services/languageIds';

export type MonacoWithLanguages = {
  languages: {
    getLanguages(): LanguagesType.ILanguageExtensionPoint[];
  };
};

export const languageOverrides = new Map([
  ['javascript', LanguageId.Javascript],
  ['js', LanguageId.Javascript],
]);

const extensionOverrides = new Map<string | undefined, string>([
  ['.rmd', '.r'],
  ['.sqlite', '.sql'],
]);

const getExtensionForFileName = (fileName?: string) => {
  const extension = fileName
    ?.substring(fileName.lastIndexOf('.'))
    .toLowerCase();
  return extensionOverrides.get(extension) ?? extension;
};

const getLanguageForExtension = (
  monaco: MonacoWithLanguages,
  extension: string
) => {
  return monaco.languages
    .getLanguages()
    .find((language) => language.extensions?.includes(extension.toLowerCase()))
    ?.id;
};

export const getLanguageForName = (
  monaco: MonacoWithLanguages,
  language: string
) => {
  const normalized = language.toLowerCase();
  // check if monaco already knows it, otherwise check extensions
  const isInMonaco = monaco.languages
    .getLanguages()
    .find((language) => language.id === normalized);
  const baseLanguage = isInMonaco
    ? normalized
    : getLanguageForExtension(monaco, `.${language.toLowerCase()}`);

  if (!baseLanguage) {
    return LanguageId.Default;
  }

  return languageOverrides.get(baseLanguage) ?? baseLanguage;
};

export const getLanguageForFile = (
  monaco: MonacoWithLanguages,
  fileName?: string
) => {
  if (fileName?.match(/\.min\./)) {
    return LanguageId.Default;
  }

  const extension = getExtensionForFileName(fileName);
  if (!extension) {
    return LanguageId.Default;
  }

  const baseLanguage = getLanguageForExtension(monaco, extension);
  if (!baseLanguage) {
    return LanguageId.Default;
  }

  return languageOverrides.get(baseLanguage) ?? baseLanguage;
};
