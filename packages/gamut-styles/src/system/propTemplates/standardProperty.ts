import { AbstractSystemConfig, StyleTemplate } from '../types';
import { propMap, PropAlias } from '../constants';

export const standardProperty = <
  T extends Record<string, unknown>,
  K extends AbstractSystemConfig
>(
  propName: K['propName'] | K['propName'][number],
  computeValue: K['computeValue']
): StyleTemplate<T> => {
  return (props: T) => {
    const propKey = propName as PropAlias;
    if (props[propKey] !== undefined && props[propKey] !== null) {
      return `${propMap[propKey]}: ${computeValue!(props[propKey])};`;
    }
    return '';
  };
};
