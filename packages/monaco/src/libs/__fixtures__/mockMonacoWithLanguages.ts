export const mockMonacoWithLanguages = {
  languages: {
    getLanguages: () => [
      {
        id: 'known',
        extensions: ['.known'],
      },
      {
        id: 'js',
        extensions: ['.js'],
      },
      {
        id: 'codecademy-css',
        extensions: ['.css'],
      },
    ],
  },
};
