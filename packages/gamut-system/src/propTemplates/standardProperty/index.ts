import { get, isObject } from 'lodash';
import {
  AbstractProps,
  AbstractPropertyConfig,
  StyleTemplate,
  ScaleMap,
  ScaleArray,
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
    let propValue = props[propName];
    if (propValue === undefined) {
      return;
    }

    let scaleShape = scale;
    if (typeof scaleShape === 'string') {
      scaleShape = get(props, `theme.${scale}`, {}) as ScaleMap | ScaleArray;
    }

    if (isObject(scaleShape)) {
      propValue = get(scaleShape, `${propValue}`, propValue);
    }

    return {
      [propName]: computeValue(propValue),
    };
  };
};
