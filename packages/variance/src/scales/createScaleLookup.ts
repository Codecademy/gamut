import { get, isArray, isObject, isString } from 'lodash';

import { Prop } from '../types/config';
import { ThemeProps } from '../types/props';

type GetScaleValue = (
  val: string | number,
  props: ThemeProps
) => string | number | undefined;

export const createScaleLookup = (scale: Prop['scale']): GetScaleValue => {
  if (isString(scale)) {
    return (val, props) => get(props, ['theme', scale, val]);
  }
  if (isArray(scale)) {
    return (val) => val;
  }
  if (isObject(scale)) {
    return (val) => get(scale, val);
  }

  return () => undefined;
};
