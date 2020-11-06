import { get, identity, isNumber, isObject, isString } from 'lodash';
import {
  AbstractPropertyConfig,
  AbstractProps,
  ScaleArray,
  ScaleMap,
} from '../../types/config';

export const deriveScaleFunction = (
  scale: ScaleMap | ScaleArray | undefined
) => {
  if (isObject(scale)) {
    return (value: unknown) =>
      isString(value) || isNumber(value) ? get(scale, value, value) : value;
  }
  return identity;
};

export const createScaleValueTransformer = <
  Config extends AbstractPropertyConfig,
  Props extends AbstractProps
>({
  scale,
}: Config) => {
  if (isString(scale)) {
    return (props: Props) => deriveScaleFunction(get(props, ['theme', scale]));
  }
  return (props: Props) => deriveScaleFunction(scale);
};
