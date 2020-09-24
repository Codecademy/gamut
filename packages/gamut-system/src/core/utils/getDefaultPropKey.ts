import { entries } from 'lodash';

export const altKeys = {
  borderStyle: /border(.*)Style/g,
  borderWidth: /border(.*)Width/g,
  margin: /margin/,
  padding: /padding/,
};

const propAndAlts = entries(altKeys);

export const getDefaultPropKey = (key: string) => {
  for (const [main, matcher] of propAndAlts) {
    if (matcher.test(key)) {
      return main;
    }
  }
  return key;
};
