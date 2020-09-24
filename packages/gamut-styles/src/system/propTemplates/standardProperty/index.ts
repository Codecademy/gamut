import {
  AbstractProps,
  AbstractSystemConfig,
  PropAlias,
  StyleTemplate,
} from '../../types';

export const standardProperty = <
  Props extends AbstractProps,
  Config extends AbstractSystemConfig
>(
  propName: Config['propName'],
  computeValue: Config['computeValue']
): StyleTemplate<Props> => {
  return (props: Props) => {
    const propKey = propName as PropAlias;
    if (props[propKey] !== undefined && props[propKey] !== null) {
      return {
        [propKey]: computeValue!(props[propKey]),
      };
    }
    return;
  };
};
