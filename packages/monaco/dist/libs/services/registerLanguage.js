export var registerLanguage = function registerLanguage(monaco, languageId, languageConfiguration, languageDefinition) {
  monaco.languages.register({
    id: languageId
  });
  monaco.languages.setLanguageConfiguration(languageId, languageConfiguration);
  monaco.languages.setMonarchTokensProvider(languageId, languageDefinition);
};