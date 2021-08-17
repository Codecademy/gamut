import { LanguageId } from '../services/languageIds';

export const mockLanguagesInMonaco = [
  {
    id: 'known',
    extensions: ['.known'],
  },
  // TODO replace javascript with a different language when more language services are added
  {
    id: 'javascript',
    extends: ['.js'],
  },
  {
    id: LanguageId.Javascript,
    extensions: ['.js'],
  },
];

export const mockMonacoWithLanguages = {
  languages: {
    getLanguages: () => mockLanguagesInMonaco,
  },
};
