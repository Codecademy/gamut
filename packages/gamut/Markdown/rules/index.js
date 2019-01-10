import SimpleMarkdown from 'simple-markdown';
import iframe from './iframe';

const rules = {
  ...SimpleMarkdown.defaultRules,
  iframe,
};

export default rules;
