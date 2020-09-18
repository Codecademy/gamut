import { AbstractPropConfig, PropAlias, StyleTemplate } from '../../types';

export const standardProperty = <
  T extends Record<string, unknown>,
  K extends AbstractPropConfig
>(
  propName: K['propName'],
  computeValue: K['computeValue']
): StyleTemplate<T> => {
  return (props: T) => {
    const propKey = propName as PropAlias;
    if (props[propKey] !== undefined && props[propKey] !== null) {
      return {
        [propKey]: computeValue!(props[propKey]),
      };
    }
    return;
  };
};
