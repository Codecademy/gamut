import { HTMLHint } from 'htmlhint/lib/htmlhint';

// import { ValidateSyntax } from '../../languageServices/types';
import { formatValidationComplaint } from '../formatValidationComplaint';

const defaultHtmlHintRules = {
  'tagname-lowercase': true,
  'attr-lowercase': true,
  'attr-value-double-quotes': false,
  'doctype-first': false,
  'tag-pair': true,
  'spec-char-escape': true,
  'id-unique': true,
  'src-not-empty': true,
  'attr-no-duplication': true,
};

export const validateHtmlSyntax: any = (text: any) => {
  const lintResults = HTMLHint.verify(text, defaultHtmlHintRules);

  return lintResults.map(formatValidationComplaint);
};
