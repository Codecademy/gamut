import { LanguageId } from '../services/languageIds';

export const mockMonacoWithLanguages = {
  languages: {
    getLanguages: () => [
      {
        id: 'known',
        extensions: ['.known'],
      },
      {
        id: LanguageId.CodecademyJs,
        extensions: ['.js'],
      },
      {
        id: LanguageId.CodecademyCss,
        extensions: ['.css'],
      },
    ],
  },
};
