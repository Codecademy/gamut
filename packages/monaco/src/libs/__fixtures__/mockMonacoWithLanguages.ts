import { LanguageId } from '../services/languageIds';

export const mockMonacoConfig = [
  {
    id: 'known',
    extensions: ['.known'],
  },
  {
    id: LanguageId.Javascript,
    extensions: ['.js'],
  },
];

export const mockMonacoWithLanguages = {
  languages: {
    getLanguages: () => mockMonacoConfig,
  },
};
