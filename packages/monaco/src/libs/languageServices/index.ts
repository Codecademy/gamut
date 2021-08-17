// TODO add missing languages
import { LanguageId, TranslatableLanguageIds } from '../services/languageIds';
import { LanguageServices } from './LanguageService';
import { LanguageCreatorImporter } from './types';

const languageToImport: Record<
  TranslatableLanguageIds,
  LanguageCreatorImporter<unknown>
> = {
  [LanguageId.Javascript]: () => import('../services/javascript'),
  [LanguageId.Html]: () => import('../services/html'),
};

export const importedLanguages = new Map(Object.entries(languageToImport));

export const languageServices = new LanguageServices(importedLanguages);
