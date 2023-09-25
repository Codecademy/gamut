import { LanguageId } from '../services/languageIds';
export var languageOverrides = new Map([['javascript', LanguageId.Javascript], ['js', LanguageId.Javascript]]);
var extensionOverrides = new Map([['.rmd', '.r'], ['.sqlite', '.sql']]);
var getExtensionForFileName = function getExtensionForFileName(fileName) {
  var _extensionOverrides$g;
  var extension = fileName === null || fileName === void 0 ? void 0 : fileName.substring(fileName.lastIndexOf('.')).toLowerCase();
  return (_extensionOverrides$g = extensionOverrides.get(extension)) !== null && _extensionOverrides$g !== void 0 ? _extensionOverrides$g : extension;
};
var getLanguageForExtension = function getLanguageForExtension(monaco, extension) {
  var _monaco$languages$get;
  return (_monaco$languages$get = monaco.languages.getLanguages().find(function (language) {
    var _language$extensions;
    return (_language$extensions = language.extensions) === null || _language$extensions === void 0 ? void 0 : _language$extensions.includes(extension.toLowerCase());
  })) === null || _monaco$languages$get === void 0 ? void 0 : _monaco$languages$get.id;
};
export var getLanguageForName = function getLanguageForName(monaco, language) {
  var _languageOverrides$ge;
  var normalized = language.toLowerCase();
  // check if monaco already knows it, otherwise check extensions
  var isInMonaco = monaco.languages.getLanguages().find(function (language) {
    return language.id === normalized;
  });
  var baseLanguage = isInMonaco ? normalized : getLanguageForExtension(monaco, ".".concat(language.toLowerCase()));
  if (!baseLanguage) {
    return LanguageId.Default;
  }
  return (_languageOverrides$ge = languageOverrides.get(baseLanguage)) !== null && _languageOverrides$ge !== void 0 ? _languageOverrides$ge : baseLanguage;
};
export var getLanguageForFile = function getLanguageForFile(monaco, fileName) {
  var _languageOverrides$ge2;
  if (fileName !== null && fileName !== void 0 && fileName.match(/\.min\./)) {
    return LanguageId.Default;
  }
  var extension = getExtensionForFileName(fileName);
  if (!extension) {
    return LanguageId.Default;
  }
  var baseLanguage = getLanguageForExtension(monaco, extension);
  if (!baseLanguage) {
    return LanguageId.Default;
  }
  return (_languageOverrides$ge2 = languageOverrides.get(baseLanguage)) !== null && _languageOverrides$ge2 !== void 0 ? _languageOverrides$ge2 : baseLanguage;
};