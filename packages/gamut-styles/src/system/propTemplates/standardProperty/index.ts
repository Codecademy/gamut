import { AbstractPropConfig, PropAlias, StyleTemplate } from '../../types';

export const standardProperty = <
  Config extends Required<Omit<AbstractPropConfig, 'scale'>>,
  Props extends Record<string, unknown>
>({
  propName,
  computeValue,
}: Config): StyleTemplate<Props> => {
  return (props: Props) => {
    const propKey = propName as PropAlias;
    if (props[propKey] !== undefined && props[propKey] !== null) {
      return {
        [propKey]: computeValue(props[propKey]),
      };
    }
    return;
  };
};
