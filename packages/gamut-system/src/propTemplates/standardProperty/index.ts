import { get } from 'lodash';
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
    const propValue = props[propName];
    const value = get(props, `theme.${scale}.${propValue}`, propValue);
    if (value === undefined) return;
    return {
      [propName]: computeValue(value),
    };
  };
};
