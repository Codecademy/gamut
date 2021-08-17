import { LanguageCreator, Monaco } from '../../languageServices/types';
import { LanguageId } from '../languageIds';
import { registerLanguage } from '../registerLanguage';
import * as htmlLanguage from './htmlLanguage';
import { validateHtmlSyntax } from './validateHtmlSyntax';

const html: LanguageCreator<Monaco> = (monaco) => {
  registerLanguage(
    monaco,
    LanguageId.Html,
    htmlLanguage.createConfiguration(monaco),
    htmlLanguage.definition
  );

  return { validateSyntax: validateHtmlSyntax };
};

export default html;
