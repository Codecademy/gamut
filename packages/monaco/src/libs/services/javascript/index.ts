import { LanguageCreator, Monaco } from '../../languageServices/types';
import { LanguageId } from '../languageIds';
import { registerLanguage } from '../registerLanguage';
import * as javascriptLanguage from './javascriptLanguage';

const javascript: LanguageCreator<Monaco> = (monaco) => {
  registerLanguage(
    monaco,
    LanguageId.Javascript,
    javascriptLanguage.createConfiguration(monaco),
    javascriptLanguage.definition
  );

  return {};
};

export default javascript;
