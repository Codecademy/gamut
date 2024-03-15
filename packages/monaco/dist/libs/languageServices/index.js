function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// TODO add missing languages
import { LanguageId } from '../services/languageIds';
import { LanguageServices } from './LanguageService';

var languageToImport = _defineProperty({}, LanguageId.Javascript, function () {
  return import('../services/javascript');
});

export var importedLanguages = new Map(Object.entries(languageToImport));
export var languageServices = new LanguageServices(importedLanguages);