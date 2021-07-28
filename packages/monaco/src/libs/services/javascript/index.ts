import { LanguageCreator, Monaco } from '../../languageServices/types';
import { LanguageIds } from '../languageIds';
import { registerLanguage } from '../registerLanguage';
import * as javascriptLanguage from './javascriptLanguage';

const javascript: LanguageCreator<Monaco> = (monaco) => {
  registerLanguage(
    monaco,
    LanguageIds.codecademyJs,
    javascriptLanguage.createConfiguration(monaco),
    javascriptLanguage.definition
  );

  return {};
};

export default javascript;
