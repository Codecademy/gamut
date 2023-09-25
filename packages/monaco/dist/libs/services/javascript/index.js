import { LanguageId } from '../languageIds';
import { registerLanguage } from '../registerLanguage';
import * as javascriptLanguage from './javascriptLanguage';
var javascript = function javascript(monaco) {
  registerLanguage(monaco, LanguageId.Javascript, javascriptLanguage.createConfiguration(monaco), javascriptLanguage.definition);
  return {};
};
export default javascript;