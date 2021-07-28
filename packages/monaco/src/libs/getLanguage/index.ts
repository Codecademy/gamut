import type { languages as LanguagesType } from 'monaco-editor';

import { LanguageIds } from '../services/languageIds';

export type MonacoWithLanguages = {
  languages: {
    getLanguages(): LanguagesType.ILanguageExtensionPoint[];
  };
};

const languageOverrides = new Map([
  ['javascript', LanguageIds.codecademyJs],
  ['js', LanguageIds.codecademyJs],
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
    return LanguageIds.codecademyDefault;
  }

  return languageOverrides.get(baseLanguage) ?? baseLanguage;
};

export const getLanguageForFile = (
  monaco: MonacoWithLanguages,
  fileName?: string
) => {
  if (fileName?.match(/\.min\./)) {
    return LanguageIds.codecademyDefault;
  }

  const extension = getExtensionForFileName(fileName);
  if (!extension) {
    return LanguageIds.codecademyDefault;
  }

  const baseLanguage = getLanguageForExtension(monaco, extension);
  if (!baseLanguage) {
    return LanguageIds.codecademyDefault;
  }

  return languageOverrides.get(baseLanguage) ?? baseLanguage;
};
