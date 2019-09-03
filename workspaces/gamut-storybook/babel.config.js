module.exports = {
  presets: ['codecademy', '@babel/preset-typescript'],
  plugins: [
    [
      'babel-plugin-react-docgen',
      {
        DOC_GEN_COLLECTION_NAME: 'STORYBOOK_REACT_CLASSES',
      },
    ],
    [
      'babel-plugin-react-docgen-typescript',
      {
        docgenCollectionName: 'STORYBOOK_REACT_CLASSES',
        include: '@codecademy.*\\.tsx$',
        exclude: 'stories\\.tsx$',
      },
    ],
  ],
  ignore: [],
};
