import { isObject, mapValues } from 'lodash';

import { AbstractProps, AbstractTheme, Handler } from '../types/config';
import { ComplexCSS, CSSObject } from '../types/css';

const isPropObject = (
  key: string,
  config: unknown
): config is AbstractProps => {
  if (key.indexOf('&') === 0 && isObject(config)) {
    return true;
  }
  return false;
};

export const splitSelectors = (
  config: AbstractProps = {}
): [AbstractProps, Record<string, AbstractProps>] => {
  const base: AbstractProps = {};
  const pseudo: Record<string, AbstractProps> = {};

  Object.keys(config).forEach((key) => {
    const prop = config[key];
    if (isPropObject(key, prop)) {
      pseudo[key] = prop;
    } else {
      base[key] = prop;
    }
  });

  return [base, pseudo];
};

export const handleSelectorStyles = (
  base: AbstractProps,
  pseudos: Record<string, AbstractProps>,
  styleFn: Handler<AbstractProps>
) => ({ theme }: { theme?: AbstractTheme }) => {
  const baseStyles = styleFn({ ...base, theme });
  const pseudoStyles = mapValues(pseudos, (styles) =>
    styleFn({ ...styles, theme })
  );

  return {
    ...baseStyles,
    ...pseudoStyles,
  } as ComplexCSS<CSSObject>;
};
