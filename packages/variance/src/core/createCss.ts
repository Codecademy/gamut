import { Theme } from '@emotion/react';
import { isObject } from 'lodash';

import {
  AbstractParser,
  CSS,
  Parser,
  Prop,
  TransformerMap,
} from '../types/config';
import { CSSObject } from '../types/props';
import { getStaticCss } from '../utils/getStaticProperties';
import { createProps } from './createProps';

const templateSelectorCss = <Props extends Record<string, unknown>>(
  parser: AbstractParser,
  cssProps: Props,
  selectors: string[],
  filters: string[],
  theme?: Theme
) => {
  const css = parser({ ...cssProps, theme });
  selectors.forEach((selector) => {
    const selectorConfig = cssProps[selector];
    if (isObject(selectorConfig)) {
      css[selector] = {
        ...getStaticCss(selectorConfig, filters),
        ...parser(Object.assign(selectorConfig, { theme })),
      };
    }
  });
  return css;
};

export function createCss<
  Config extends Record<string, Prop>,
  P extends Parser<TransformerMap<Config>>
>(config: Config): CSS<P> {
  const parser = createProps(config);
  const filteredProps: string[] = parser.propNames;
  return (cssProps) => {
    let cache: CSSObject;
    const allKeys = Object.keys(cssProps);

    /** Any key of the CSSProps that is not a System Prop or a Static CSS Property is treated as a nested selector */
    const selectors = allKeys.filter(
      (key) => !filteredProps.includes(key) && isObject(cssProps[key])
    );

    /** Static CSS Properties get extracted if they match neither syntax */
    const staticCss = getStaticCss(cssProps, [...selectors, ...filteredProps]);

    return ({ theme }) => {
      if (cache) return cache;

      const systemCss = templateSelectorCss(
        parser,
        cssProps,
        selectors,
        filteredProps,
        theme
      );

      /** Merge the static and generated css and save it to the cache */
      cache = {
        ...staticCss,
        ...systemCss,
      };
      return cache;
    };
  };
}
