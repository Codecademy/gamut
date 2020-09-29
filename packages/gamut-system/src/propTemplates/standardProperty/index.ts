import { themeScaleValue } from '../../transforms/themeScaleValue';
import {
  AbstractProps,
  AbstractPropertyConfig,
  StyleTemplate,
} from '../../types/system';

export const standardProperty = <
  Props extends AbstractProps,
  Config extends AbstractPropertyConfig &
    Required<Pick<AbstractPropertyConfig, 'propName' | 'computeValue'>>
>({
  propName,
  scale,
  computeValue,
}: Config): StyleTemplate<Props> => {
  return (props: Props) => {
    const value = themeScaleValue(props as any, scale, props[propName] as any);
    if (value === undefined) return;
    return {
      [propName]: computeValue(value),
    };
  };
};
